import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  Smartphone,
  Copy,
  Check,
  Clock
} from 'lucide-react';

const PhonePePayment = ({ amount, onSuccess, onClose }) => {
  const [step, setStep] = useState('qr');
  const [qrCode, setQrCode] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [copied, setCopied] = useState(false);
  const [upiId] = useState('pakrimushroom@okhdfcbank');

  const upiDetails = {
    vpa: upiId,
    name: 'Pakri Mushroom',
    amount: amount,
    note: `Payment #${Date.now().toString().slice(-4)}`
  };

  useEffect(() => {
    const upiString = `upi://pay?pa=${upiDetails.vpa}&pn=${encodeURIComponent(upiDetails.name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(upiDetails.note)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}`;
    setQrCode(qrUrl);
    setTransactionId(`TXN${Date.now().toString().slice(-6)}`);
  }, [amount]);

  useEffect(() => {
    if (step === 'qr' || step === 'scanning') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePaymentCheck = () => {
    setStep('verifying');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        setStep('success');
        setTimeout(() => {
          onSuccess({
            transactionId,
            amount,
            upiId,
            status: 'SUCCESS'
          });
        }, 1000);
      } else {
        setStep('failed');
      }
    }, 2000);
  };

  const startScanner = () => {
    setStep('scanning');
    setTimeout(simulatePaymentCheck, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-1"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white shadow-lg w-full max-w-[280px] rounded-lg overflow-hidden"
      >
        {/* Mini Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Smartphone className="w-3 h-3" />
              <span className="text-xs font-bold">PhonePe</span>
            </div>
            <button onClick={onClose} className="p-0.5">
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="text-center mt-0.5">
            <p className="text-[8px] text-purple-100">Amount</p>
            <p className="text-sm font-bold">₹{amount}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* QR Step - Mini */}
          {step === 'qr' && (
            <motion.div
              key="qr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-2"
            >
              {/* Timer */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-[7px] text-gray-500">Expires in</span>
                <span className={`text-[8px] font-mono ${timeLeft < 60 ? 'text-red-500' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 p-2 rounded mb-2 flex justify-center">
                {qrCode ? (
                  <img src={qrCode} alt="QR" className="w-28 h-28" />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center">
                    <Loader className="w-4 h-4 text-purple-600 animate-spin" />
                  </div>
                )}
              </div>

              {/* UPI ID */}
              <div className="mb-2">
                <p className="text-[7px] text-gray-500 mb-0.5">UPI ID:</p>
                <div className="flex items-center bg-gray-50 p-1 rounded">
                  <span className="text-[8px] font-mono truncate flex-1">{upiId}</span>
                  <button onClick={handleCopyUpi} className="p-0.5">
                    {copied ? (
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    ) : (
                      <Copy className="w-2.5 h-2.5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-1 mb-2">
                {['Open', 'Scan', 'Pay'].map((text, i) => (
                  <div key={i} className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-[6px] text-green-600 font-bold">{i+1}</span>
                    </div>
                    <span className="text-[7px] text-gray-600">{text}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="space-y-1">
                <button
                  onClick={startScanner}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-1.5 rounded text-[8px] font-semibold flex items-center justify-center space-x-0.5"
                >
                  <Camera className="w-2.5 h-2.5" />
                  <span>Paid</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-gray-200 text-gray-600 py-1.5 rounded text-[8px] font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Scanning */}
          {step === 'scanning' && (
            <motion.div className="p-4 text-center">
              <div className="w-12 h-12 mx-auto relative mb-2">
                <div className="absolute inset-0 border-4 border-purple-200 rounded-lg animate-pulse"></div>
                <Camera className="w-5 h-5 text-purple-600 absolute inset-1.5" />
              </div>
              <p className="text-[8px] text-gray-600 mb-1">Verifying...</p>
              <div className="bg-purple-50 p-1 rounded">
                <span className="text-[7px] text-purple-800">{formatTime(timeLeft)}</span>
              </div>
            </motion.div>
          )}

          {/* Verifying */}
          {step === 'verifying' && (
            <motion.div className="p-4 text-center">
              <Loader className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-2" />
              <p className="text-[8px] text-gray-600">Processing...</p>
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && (
            <motion.div className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-[8px] text-gray-600 mb-2">₹{amount} paid</p>
              <button
                onClick={onClose}
                className="w-full bg-green-600 text-white py-1.5 rounded text-[8px] font-semibold"
              >
                Done
              </button>
            </motion.div>
          )}

          {/* Failed */}
          {step === 'failed' && (
            <motion.div className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-[8px] text-gray-600 mb-2">Failed</p>
              <div className="space-y-1">
                <button
                  onClick={() => setStep('qr')}
                  className="w-full bg-purple-600 text-white py-1.5 rounded text-[8px] font-semibold"
                >
                  Retry
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-gray-200 py-1.5 rounded text-[8px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Footer */}
        <div className="border-t border-gray-100 p-1 bg-gray-50 text-center">
          <span className="text-[6px] text-gray-400">⚡ Secure • Instant</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhonePePayment;