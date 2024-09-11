import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { useRef } from "react";

const QRCodeComponent = ({ value }) => {
  const qrRef = useRef();

  const downloadQRCode = () => {
    if (qrRef.current === null) {
      return;
    }

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `qrcode_${value}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating PNG: ", err);
      });
  };

  return (
    <div>
      <div ref={qrRef}>
        <QRCode value={value} size={128} />
      </div>
    </div>
  );
};
