import AdmissionGoing from "./AdmissionGoing"
import FooterWidget from "./FooterWidget"
import PaymentMerchants from "./PaymentMerchants"

const MainFooter = () => {
  return (
    <footer>
      <AdmissionGoing />
      <PaymentMerchants />
      <FooterWidget />
    </footer>
  )
}

export default MainFooter
