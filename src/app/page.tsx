import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>hello my friend</h1>
      {/* using an anchor a reloads everything -> CLIENT SIDE NAVIGATION WITH LINK */}
      <Link href="/users">Users</Link>
    </main>
  )
}
