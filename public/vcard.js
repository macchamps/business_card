let user;

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

fetch('/api/user/' + userId)
  .then(res => res.json())
  .then(data => {
    user = data;

    document.getElementById('name').innerText = user.name;
    document.getElementById('email').innerText = user.email;
    document.getElementById('emailRow').href = "mailto:" + user.email;
    document.getElementById('title').innerText = user.title;
    document.getElementById('phone').innerText = user.phone;
    document.getElementById('businessname').innerText = user.businessname;
    document.getElementById('whatsapp').href = "https://api.whatsapp.com/send?phone=" + user.phone;
    const websiteLink = document.getElementById('website');
    websiteLink.href = user.website;
    websiteLink.innerText = user.website;
    document.getElementById('location').innerText = user.location;
    document.getElementById('about').innerText = user.about;
    document.getElementById('profileImage').src = user.profileImage;
    document.getElementById('businessImage').src = user.businessImage;
  });

function toBase64(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
}

document.getElementById("vcardDownload").addEventListener("click", async function (e) {
  e.preventDefault();

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  if (!user) {
    alert("User data is still loading. Please try again shortly.");
    loader.style.display = 'none';
    return;
  }

  try {
    let photoBase64 = '';
    try {
      photoBase64 = await toBase64(user.profileImage);
    } catch (err) {
      console.warn("Image base64 conversion failed", err);
    }

    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${user.name}
N:${user.name.split(" ").reverse().join(";")}
ORG:${user.businessname}
TITLE:${user.title}
TEL;TYPE=CELL:${user.phone}
EMAIL:${user.email}
URL:${user.website}
ADR;TYPE=WORK:;;${user.location};;;
NOTE:${user.about}
${photoBase64 ? `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}` : ''}
END:VCARD
    `.trim();

    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } finally {
    loader.style.display = 'none';
  }
});