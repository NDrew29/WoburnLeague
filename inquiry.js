document.getElementById('inquiryForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    Name: formData.get('name'),
    DOB: formData.get('dob'),
    Experience: formData.get('experience'),
    Phone: formData.get('phone'),
    Email: formData.get('email')
  };

  // Create CSV row
  const csvRow = `${data.Name},${data.DOB},${data.Experience},${data.Phone},${data.Email}\n`;

  // Download as CSV (optional offline record keeping)
  const blob = new Blob([csvRow], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'WHL_PlayerInquiries.csv';
  link.click();

  // Display confirmation
  document.getElementById('confirmation').style.display = 'block';

  // Optional: Email notification placeholder
  console.log("Email to ndrew@autouse.com would be triggered here if backend was present.");
});
