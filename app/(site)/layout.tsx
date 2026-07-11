import Nav from '../_ui/Nav'
import Footer from '../_ui/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="cl-wrap">
      <Nav />
      {children}
      <Footer />
    </div>
  )
}
