import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h2 className="text-8xl text-cyan-800">Todo App 2</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero repellendus tempore, exercitationem odit, quasi doloremque possimus recusandae alias sequi totam soluta natus iure eius, obcaecati sint dolores blanditiis aspernatur quo officia iusto ut. Et, aliquid sed voluptates iste cum totam, facere explicabo, fugit suscipit ratione aspernatur consequuntur ex mollitia quaerat?</p>

      <div className="flex justify-center my-8">
        <Link href="/signup">
          <button className="btn-primary">Sign-Up</button>
        </Link>
        <Link href="/login">
          <button className="btn-primary">Login</button>
        </Link>
      </div>
    </main>
  )
}
