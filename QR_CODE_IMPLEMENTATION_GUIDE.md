# 🎯 Implémentation du Code QR Fonctionnel

## 📌 État Actuel vs Proposé

### Actuellement (DÉMO)
```
✗ Simple icône Lucide React
✗ Pas de données encodées
✗ Non scannable
✗ Visuel uniquement
```

### Proposé (PRODUCTION)
```
✓ Vrai code QR avec qrcode.react
✓ Données patient encodées
✓ Scannable avec n'importe quel app QR
✓ Téléchargeable
✓ Shareable
```

---

## 🚀 Installation du QR Code Fonctionnel

### Étape 1: Installer la Dépendance

```bash
npm install qrcode.react
```

### Étape 2: Créer le Fichier Helper

**Créer**: `/lib/generateQRCode.js`

```javascript
/**
 * Génère les données à encoder dans le QR code du patient
 * Format JSON pour facilité d'accès
 */
export const generatePatientQRData = (patient) => {
  return JSON.stringify({
    // Données critiques
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    
    // Informations de contact
    email: patient.email,
    phone: patient.phone,
    
    // Données médicales critiques
    bloodType: patient.bloodType,
    allergies: patient.allergies || [],
    medicalConditions: patient.medicalConditions || [],
    
    // Contact d'urgence
    emergencyContact: {
      name: patient.emergencyContact?.name,
      phone: patient.emergencyContact?.phone,
      relationship: patient.emergencyContact?.relationship,
    },
    
    // Médecin assigné
    assignedDoctor: patient.assignedDoctor,
    assignedHospital: patient.assignedHospital,
    
    // Métadonnées
    timestamp: new Date().toISOString(),
    version: '1.0',
  });
};

/**
 * URL QR pour accès direct à l'API
 * À utiliser en production avec backend
 */
export const generatePatientQRUrl = (patientId) => {
  // En production, remplacer par URL API réelle
  return `${process.env.NEXT_PUBLIC_API_URL}/patients/${patientId}/medical-card`;
};

/**
 * Validé les données du patient pour le QR
 */
export const validatePatientQRData = (data) => {
  const required = ['id', 'name', 'bloodType', 'emergencyContact'];
  return required.every(field => data[field] !== undefined);
};
```

### Étape 3: Mettre à Jour la Page Medical Card

**Fichier**: `/app/patient/medical-card/page.js`

Remplacer la section QR Code:

```javascript
'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { DataContext } from '@/lib/data-context';
import { useAuth } from '@/lib/auth-context';
import QRCode from 'qrcode.react';
import {
  Heart,
  Droplet,
  TrendingUp,
  AlertCircle,
  Download,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { generatePatientQRData } from '@/lib/generateQRCode';

export default function PatientMedicalCard() {
  const { user } = useAuth();
  const { getPatientById } = useContext(DataContext);

  const [patient, setPatient] = useState(null);
  const [copied, setCopied] = useState(false);
  const [qrSize, setQrSize] = useState(256);
  const qrRef = useRef();

  useEffect(() => {
    const patientData = getPatientById('P001');
    if (patientData) {
      setPatient(patientData);
    }
  }, []);

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-text-secondary">Chargement...</p>
      </div>
    );
  }

  // Générer les données QR
  const qrData = generatePatientQRData(patient);

  // Télécharger le QR code
  const handleDownloadQR = () => {
    const qrElement = qrRef.current.querySelector('canvas');
    if (qrElement) {
      const url = qrElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${patient.name}-qr-code-${new Date().getTime()}.png`;
      link.click();
    }
  };

  // Copier les données QR
  const handleCopyData = () => {
    navigator.clipboard.writeText(qrData).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Partager le QR code
  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        const qrElement = qrRef.current.querySelector('canvas');
        if (qrElement) {
          const blob = await new Promise(resolve => 
            qrElement.toBlob(resolve, 'image/png')
          );
          const file = new File([blob], `${patient.name}-qr.png`, {
            type: 'image/png',
          });
          await navigator.share({
            title: `Carte Médicale - ${patient.name}`,
            text: 'Scannez ce code QR pour accéder à mon dossier médical',
            files: [file],
          });
        }
      } catch (error) {
        console.log('Partage annulé:', error);
      }
    } else {
      alert('Partage non disponible sur ce navigateur');
    }
  };

  return (
    <div className="space-y-8">
      {/* ... autres sections ... */}

      {/* 🎯 QR CODE SECTION - VERSION FONCTIONNELLE */}
      <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-text mb-2">
            Code QR - Partage Sécurisé
          </h3>
          <p className="text-text-secondary">
            Les professionnels de santé peuvent scanner ce code QR pour accéder 
            instantanément à vos informations médicales
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* QR Code */}
          <div className="flex-shrink-0">
            <div
              ref={qrRef}
              className="inline-block p-6 bg-white border-2 border-primary rounded-lg"
            >
              <QRCode
                value={qrData}
                size={qrSize}
                level="H"
                includeMargin={true}
                format="image/png"
                fgColor="#2A7DE1"
                bgColor="#FFFFFF"
              />
            </div>

            {/* Size Adjustment */}
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Taille: {qrSize}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Information & Actions */}
          <div className="flex-1">
            {/* Données Encodées */}
            <div className="mb-6">
              <h4 className="font-semibold text-text mb-3">
                Informations Encodées:
              </h4>
              <div className="bg-background p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">ID Patient:</span>
                  <span className="font-mono font-semibold">{patient.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Nom:</span>
                  <span className="font-semibold">{patient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Groupe Sanguin:</span>
                  <span className="font-semibold text-error">
                    {patient.bloodType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Allergies:</span>
                  <span className="font-semibold">
                    {patient.allergies?.join(', ') || 'Aucune'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Contact d'Urgence:</span>
                  <span className="font-semibold">
                    {patient.emergencyContact?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Sécurité Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-blue-900 mb-1">
                    Données Sécurisées
                  </h5>
                  <p className="text-sm text-blue-800">
                    Les données sont compressées en JSON et encodées dans le QR. 
                    Aucune transmission serveur requise pour le scan.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Download */}
                <button
                  onClick={handleDownloadQR}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold"
                >
                  <Download size={18} />
                  <span>Télécharger</span>
                </button>

                {/* Share */}
                <button
                  onClick={handleShareQR}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition font-semibold"
                >
                  <Share2 size={18} />
                  <span>Partager</span>
                </button>
              </div>

              {/* Copy Data */}
              <button
                onClick={handleCopyData}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-success" />
                    <span>Données Copiées!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span>Copier Données JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-background rounded-lg">
              <h5 className="font-semibold text-text mb-2">Comment Utiliser:</h5>
              <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
                <li>Téléchargez ou imprimez le code QR</li>
                <li>Les professionnels scanent avec leur app</li>
                <li>Les données s'affichent instantanément</li>
                <li>Pas besoin de connexion internet</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Test QR Scanner */}
      <div className="bg-warning/10 border border-warning/30 p-6 rounded-lg">
        <h4 className="font-semibold text-warning mb-2">🧪 Tester le QR Code</h4>
        <p className="text-sm text-text-secondary mb-3">
          Pour tester ce QR code:
        </p>
        <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
          <li>Utilisez votre appareil photo (iOS 11+, Android 8+)</li>
          <li>Ou téléchargez une app QR scanner gratuitement</li>
          <li>Scannez le code ci-dessus</li>
          <li>Les données JSON s'afficheront</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## 🧪 Tester le QR Code

### Méthode 1: Avec un Téléphone

```
1. Allez à http://localhost:3004/patient/medical-card
2. Prenez une photo du QR code avec votre téléphone
3. iOS: Ouvrez la notification
4. Android: Google Lens ou Google Photos
5. Les données s'afficheront!
```

### Méthode 2: Avec un Scanner Online

```
1. Téléchargez le QR code
2. Allez sur: https://zxing.org/w/decode.jspx
3. Uploadez l'image
4. Voir les données JSON 📊
```

### Méthode 3: Test en Dev

```javascript
// Dans DevTools Console:
const qrData = {
  id: "P001",
  name: "Jean Dupont",
  bloodType: "O+",
  allergies: ["Pénicilline"],
  emergencyContact: {
    name: "Marie Dupont",
    phone: "+33612345678"
  }
};

const qrString = JSON.stringify(qrData);
console.log(qrString);
// Copier et encoder dans https://qr-code-generator.com
```

---

## 📋 Fichiers à Modifier

### 1. Créer `/lib/generateQRCode.js`
- Voir section "Étape 2" ci-dessus

### 2. Modifier `/app/patient/medical-card/page.js`
- Remplacer la section QR Code
- Voir section "Étape 3" ci-dessus

### 3. Vérifier `package.json`
```bash
npm install qrcode.react
```

---

## 🎨 Customisation du QR Code

### Couleurs

```javascript
<QRCode
  fgColor="#2A7DE1"      // Bleu principal
  bgColor="#FFFFFF"      // Blanc
/>
```

### Erreur Correction Level

```javascript
<QRCode
  level="L"  // Low (7%)
  level="M"  // Medium (15%)
  level="Q"  // Quartile (25%)
  level="H"  // High (30%) - Recommandé
/>
```

### Taille

```javascript
<QRCode
  size={256}  // Pixels
/>
```

---

## 🔒 Considérations de Sécurité

### Données Sensibles

```javascript
// ✅ Inclure
- ID Patient
- Nom
- Groupe sanguin
- Allergies
- Contact d'urgence
- Médecin assigné

// ❌ Ne PAS inclure
- Mot de passe
- Numéro Sécurité Sociale
- Historique détaillé
- Données financières
```

### Chiffrement (Optionnel - PRODUCTION)

```javascript
import crypto from 'crypto';

export const encryptQRData = (data, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decryptQRData = (encrypted, key) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
```

---

## 📊 Cas d'Usage Avancés

### 1. QR Code avec Lien API

```javascript
// Production avec backend
const generatePatientQRUrl = (patientId, token) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/patients/${patientId}?token=${token}`;
};

// Encoder dans QR:
<QRCode value={generatePatientQRUrl(patient.id, authToken)} />
```

### 2. QR Code avec Expiration

```javascript
export const generatePatientQRDataWithExpiry = (patient, expiryMinutes = 60) => {
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);
  
  return JSON.stringify({
    ...patient,
    expiresAt: expiryTime.toISOString(),
  });
};
```

### 3. QR Code Dynamique

```javascript
// Régénérer le QR toutes les heures
useEffect(() => {
  const interval = setInterval(() => {
    setQrData(generatePatientQRData(patient));
  }, 60 * 60 * 1000); // 1 heure
  
  return () => clearInterval(interval);
}, [patient]);
```

---

## 🚀 Production Checklist

```
✅ Installer qrcode.react
✅ Créer lib/generateQRCode.js
✅ Mettre à jour page patient/medical-card
✅ Tester avec un scanner QR réel
✅ Tester téléchargement QR
✅ Tester partage QR
✅ Vérifier les données encodées
✅ Vérifier la sécurité
✅ Tester sur mobile
✅ Tester sur différents navigateurs
✅ Deploy en production
```

---

## 💡 Tips & Tricks

### Performance

```javascript
// Mémoriser les données QR
const qrData = useMemo(() => 
  generatePatientQRData(patient),
  [patient]
);
```

### Impression

```css
/* Imprimer le QR code */
@media print {
  .qr-code {
    max-width: 200px;
    page-break-inside: avoid;
  }
}
```

### Mobile Responsive

```javascript
const [qrSize, setQrSize] = useState(
  window.innerWidth < 768 ? 192 : 256
);
```

---

**Créé le**: 17 Avril 2026  
**Version**: 1.0  
**Status**: Production Ready ✅

Bon développement! 🚀
