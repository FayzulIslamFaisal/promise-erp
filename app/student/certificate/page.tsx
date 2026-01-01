import StudentCertificate from "@/components/student-dashboard/StudentCertificate";
const CertificatePage = () => {
  return (
    <section className="py-4 px-4">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Certificates
      </h2>
      <div className="py-4 px-4">
        <StudentCertificate />
      </div>
    </section>
  );
};

export default CertificatePage;
