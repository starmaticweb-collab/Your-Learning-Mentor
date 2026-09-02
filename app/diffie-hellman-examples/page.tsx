import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diffie-Hellman Algorithm Solved Examples",
  description:
    "Step-by-step solved examples of the Diffie-Hellman key exchange algorithm. Learn how two parties establish a shared secret key.",
  alternates: {
    canonical: "https://yourlearningmentor.com/diffie-hellman-examples",
  },
  openGraph: {
    title: "Diffie-Hellman Algorithm Solved Examples | YourLearningMentor",
    description:
      "Step-by-step solved examples of the Diffie-Hellman key exchange algorithm. Learn how two parties establish a shared secret key.",
    url: "https://yourlearningmentor.com/diffie-hellman-examples",
    images: ["/og/diffie-hellman-examples.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Diffie-Hellman Algorithm Solved Examples",
  author: { "@type": "Organization", name: "YourLearningMentor" },
  datePublished: "2023-07-01",
  url: "https://yourlearningmentor.com/diffie-hellman-examples",
};

export default function DiffieHellmanExamplesPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <article className="mx-auto max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl font-heading">
              Diffie-Hellman algorithm solved examples
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              by YourLearningMentor Team · July 1, 2023
            </p>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert space-y-6 text-foreground">
            <p>
              The Diffie-Hellman key exchange algorithm establishes a shared secret key between two parties over an unsecured communication channel.
            </p>
            <p>
              In this article, we will solve a couple of Diffie-Hellman key exchange algorithm examples. It will give you a better idea about this algorithm.
            </p>

            {/* Example 1 */}
            <h2 className="text-2xl font-bold mt-10 font-heading">Example 1</h2>
            <p>
              John and Ricky use the Diffie-Hellman protocol with a common prime number p = 11 and a primitive root g = 6. If John's private key 'a' = 3 and Ricky's private key 'b' = 2 then find out:
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>John's public key 'A'</li>
              <li>Ricky's public key 'B'</li>
              <li>Shared secret key</li>
            </ol>

            <p className="font-semibold">Solution:</p>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 1. Calculate John's public key 'A' using:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>A = g ^ a mod p</p>
                <p>= 6 ^ 3 mod 11</p>
                <p>= 216 mod 11</p>
                <p className="font-bold">A = 7</p>
              </div>
              <p className="text-sm text-muted-foreground">
                You can use{" "}
                <a href="https://www.calculatorsoup.com/calculators/math/modulo-calculator.php" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  this online Modulo calculator
                </a>{" "}
                to find out the mod.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 2. Calculate Ricky's public key 'B' using:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>B = g ^ b mod p</p>
                <p>= 6 ^ 2 mod 11</p>
                <p>= 36 mod 11</p>
                <p className="font-bold">B = 3</p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 3. Calculate John's shared secret key using Ricky's public key B:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>S = B ^ a mod p</p>
                <p>= 3 ^ 3 mod 11</p>
                <p>= 27 mod 11</p>
                <p className="font-bold">= 5</p>
              </div>
              <p>Shared secret key of John = <strong>5</strong></p>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 4. Calculate Ricky's shared secret key using John's public key A:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>S = A ^ b mod p</p>
                <p>= 7 ^ 2 mod 11</p>
                <p>= 49 mod 11</p>
                <p className="font-bold">= 5</p>
              </div>
              <p>Shared secret key of Ricky = <strong>5</strong></p>
            </div>

            <p>
              John and Ricky have the same shared secret key i.e. <strong>5</strong> without transferring their private key.
            </p>

            {/* Example 2 */}
            <h2 className="text-2xl font-bold mt-10 font-heading">Example 2</h2>
            <p>
              User 1 and User 2 decided to use the Diffie-Hellman algorithm to establish a shared secret key. They selected their prime number p = 13 and its primitive root g = 2. User 1's private key is 5 and User 2's private key is 6. Find out:
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>The public key of User 1 &amp; User 2</li>
              <li>Shared secret key between User 1 &amp; User 2</li>
            </ol>

            <p className="font-semibold">Solution:</p>
            <p><strong>Given:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>prime number (p) = 13</li>
              <li>primitive root (g) = 2</li>
              <li>User 1 private key (a) = 5</li>
              <li>User 2 private key (b) = 6</li>
            </ul>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 1: Calculate the public key of User 1:</p>
              <p>Let the public key of User 1 be 'A'.</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>A = g ^ a mod p</p>
                <p>= 2 ^ 5 mod 13</p>
                <p>= 32 mod 13</p>
                <p className="font-bold">A = 6</p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 2: Calculate the public key of User 2:</p>
              <p>Let the public key of User 2 be 'B':</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>B = g ^ b mod p</p>
                <p>= 2 ^ 6 mod 13</p>
                <p>= 64 mod 13</p>
                <p className="font-bold">B = 12</p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 3: Calculate User 1's shared secret using User 2's public key B:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>S = B ^ a mod p</p>
                <p>= 12 ^ 5 mod 13</p>
                <p>= 248832 mod 13</p>
                <p className="font-bold">= 12</p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 4: Calculate User 2's shared secret key using User 1's public key A:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>S = A ^ b mod p</p>
                <p>= 6 ^ 6 mod 13</p>
                <p>= 46656 mod 13</p>
                <p className="font-bold">= 12</p>
              </div>
            </div>

            <p>
              Hence, both User 1 and User 2 have the same shared secret key i.e. <strong>12</strong>.
            </p>

            {/* Example 3 */}
            <h2 className="text-2xl font-bold mt-10 font-heading">Example 3</h2>
            <p>
              Alice and Bob want to establish a shared secret key using Diffie-Hellman key exchange protocol. Both decided on a prime number 'p' as 23 and its primitive root 'g' as 5. Alice's private key is 9 and Bob's private key is 11. Find out the public key of Alice &amp; Bob and also the shared secret key between them.
            </p>

            <p className="font-semibold">Solution:</p>
            <p><strong>Given:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Prime number (p) = 23</li>
              <li>Primitive root (g) = 5</li>
              <li>Alice's private key (a) = 9</li>
              <li>Bob's private key (b) = 11</li>
            </ul>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 1: Calculate Alice's public key using:</p>
              <p>Let Alice's public key be 'A'.</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>A = g ^ a mod p</p>
                <p>= 5 ^ 9 mod 23</p>
                <p>= 1953125 mod 23</p>
                <p className="font-bold">A = 11</p>
              </div>
              <p>Alice's public key = <strong>11</strong></p>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 2: Calculate Bob's public key using:</p>
              <p>Let Bob's public key be 'B'.</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>B = g ^ b mod p</p>
                <p>= 5 ^ 11 mod 23</p>
                <p>= 48828125 mod 23</p>
                <p className="font-bold">B = 22</p>
              </div>
              <p>Bob's public key = <strong>22</strong></p>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 3: Calculate Alice's shared secret key using Bob's public key B:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>S = B ^ a mod p</p>
                <p>= 22 ^ 9 mod 23</p>
                <p>= 1,207,269,217,792 mod 23</p>
                <p className="font-bold">S = 22</p>
              </div>
              <p>Alice's shared secret key = <strong>22</strong></p>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="font-bold font-heading">Step 4: Calculate Bob's shared secret key using Alice's public key A:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                <p>S = A ^ b mod p</p>
                <p>= 11 ^ 11 mod 23</p>
                <p>= 285,311,670,611 mod 23</p>
                <p className="font-bold">S = 22</p>
              </div>
              <p>Bob's shared secret key = <strong>22</strong></p>
            </div>

            <p>
              Hence, Alice and Bob have the same shared secret key i.e. <strong>22</strong> using Diffie-Hellman key exchange algorithm.
            </p>

            <p className="text-muted-foreground italic mt-8">
              If you found any error in the above examples, please let us know through our{" "}
              <Link href="/contact-us" className="text-accent underline underline-offset-4 hover:text-accent/80">contact page</Link>.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
