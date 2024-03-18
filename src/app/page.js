import Link from 'next/link'
import './globals.css'
import B from './components/button'



export default function Home() {
  

  return (
    <main>
      <h1>hello my friend</h1>
      {/* using an anchor a reloads everything -> CLIENT SIDE NAVIGATION WITH LINK */}
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{margin:4}}>
          <Link href="/users">Users</Link>
        </div>
        <div>
          <B/>
        </div>
      </div>
    </main>
  )
}