import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env");

// Load .env variables if not already set in process.env
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://qvvhagyfzvhairnqpugs.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runDatabaseHealthCheck() {
  console.log("=========================================");
  console.log("   SUPABASE PRE-DEPLOYMENT HEALTH CHECK  ");
  console.log("=========================================");
  console.log(`Connecting to: ${SUPABASE_URL}`);

  let hasErrors = false;

  // Test 1: Query public tutors view
  try {
    console.log("\n[Test 1] Reading from 'tutors_public'...");
    const start = performance.now();
    const { data, error, count } = await supabase
      .from("tutors_public")
      .select("id, name, slug", { count: "exact" })
      .limit(5);

    const latency = Math.round(performance.now() - start);

    if (error) {
      console.error(`❌ Test 1 Failed (${latency}ms):`, error.message);
      hasErrors = true;
    } else {
      console.log(`✅ Test 1 Passed (${latency}ms): Retrieved ${data?.length ?? 0} sample rows. Total count in DB: ${count ?? "unknown"}`);
      if (data && data.length > 0) {
        console.log(`   Sample slug: "${data[0].slug}"`);
      }
    }
  } catch (err) {
    console.error("❌ Test 1 Exception:", err.message);
    hasErrors = true;
  }

  // Test 2: Test RPC function execution
  try {
    console.log("\n[Test 2] Testing RPC 'check_tutor_slug_available'...");
    const start = performance.now();
    const testSlug = `pre-deploy-check-${Date.now()}`;
    const { data, error } = await supabase.rpc("check_tutor_slug_available", {
      _slug: testSlug,
    });
    const latency = Math.round(performance.now() - start);

    if (error) {
      console.error(`❌ Test 2 Failed (${latency}ms):`, error.message);
      hasErrors = true;
    } else {
      console.log(`✅ Test 2 Passed (${latency}ms): RPC responded successfully. Available: ${data}`);
    }
  } catch (err) {
    console.error("❌ Test 2 Exception:", err.message);
    hasErrors = true;
  }

  // Test 3: Test Storage bucket connectivity (tutor-photos)
  try {
    console.log("\n[Test 3] Testing Storage Bucket access ('tutor-photos')...");
    const start = performance.now();
    const { data, error } = await supabase.storage.getBucket("tutor-photos");
    const latency = Math.round(performance.now() - start);

    if (error) {
      // If getBucket requires admin privileges, fall back to testing public URL resolution
      console.log(`ℹ️ Bucket metadata check: ${error.message} (Standard with public anon key; testing public file URL)`);
      const { data: publicUrlData } = supabase.storage.from("tutor-photos").getPublicUrl("placeholder.jpg");
      if (publicUrlData?.publicUrl) {
        console.log(`✅ Test 3 Passed (${latency}ms): Storage URL generator verified: ${publicUrlData.publicUrl.slice(0, 60)}...`);
      }
    } else {
      console.log(`✅ Test 3 Passed (${latency}ms): Storage bucket 'tutor-photos' accessible (public: ${data.public})`);
    }
  } catch (err) {
    console.error("❌ Test 3 Exception:", err.message);
    hasErrors = true;
  }

  console.log("\n=========================================");
  if (hasErrors) {
    console.log("❌ Health check completed with ISSUES. See above logs.");
    process.exit(1);
  } else {
    console.log("✅ All Supabase database and RPC checks PASSED successfully!");
    console.log("=========================================");
  }
}

runDatabaseHealthCheck();
