import { Header } from '../components/Header'
import { Main } from '../components/Main'

export default function HomePage() {
  return (
    <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      <Header />
      <Main />
    </div>
  )
}