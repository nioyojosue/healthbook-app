# STEP 2 — Design System Components

## ✅ Composants Créés

### 1. **Button** (`components/ui/Button.js`)
Bouton réutilisable avec variantes et tailles

**Variantes:**
- `primary` - Bouton bleu principal
- `secondary` - Bouton gris secondaire
- `danger` - Bouton rouge danger
- `outline` - Bouton avec bordure

**Tailles:**
- `sm` - Petit bouton
- `md` - Taille par défaut
- `lg` - Grand bouton

**Exemple:**
```jsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

---

### 2. **Input** (`components/ui/Input.js`)
Champ d'entrée avec validation et états

**Props:**
- `label` - Étiquette du champ
- `placeholder` - Texte placeholder
- `type` - Type d'input (text, email, password, etc.)
- `error` - État d'erreur
- `success` - État de succès
- `disabled` - Désactiver l'input
- `icon` - Icône à gauche
- `helperText` - Texte d'aide

**États:**
- Normal
- Error (avec icône rouge)
- Success (avec icône verte)
- Disabled

**Exemple:**
```jsx
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';

<Input
  label="Search"
  placeholder="Type to search..."
  icon={<Search size={18} />}
  helperText="Search by name or email"
/>
```

---

### 3. **Card** (`components/ui/Card.js`)
Conteneur réutilisable avec structure flexible

**Composants:**
- `Card` - Container principal
- `CardHeader` - Section header avec titre
- `CardBody` - Contenu principal
- `CardFooter` - Section footer avec actions

**Variantes:**
- `elevated` - Avec ombre (défaut)
- `bordered` - Avec bordure épaisse
- `flat` - Design minimaliste

**Exemple:**
```jsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card variant="elevated">
  <CardHeader title="Card Title" subtitle="Optional subtitle" />
  <CardBody>
    <p>Content here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### 4. **Table** (`components/ui/Table.js`)
Tableau de données avec styling cohérent

**Composants:**
- `Table` - Tableau principal avec data
- `TableRow` - Ligne manuelle
- `TableHead` - Header de colonne
- `TableCell` - Cellule de data

**Props:**
- `columns` - Configuration des colonnes (key, label, width, render)
- `data` - Tableau de données
- `striped` - Alternance de couleurs
- `hoverable` - Effet hover sur les lignes

**Exemple:**
```jsx
import { Table } from '@/components/ui';

const columns = [
  { key: 'name', label: 'Name', width: '30%' },
  { key: 'email', label: 'Email', width: '40%' },
  {
    key: 'status',
    label: 'Status',
    width: '30%',
    render: (value) => <Badge>{value}</Badge>
  }
];

const data = [
  { name: 'John', email: 'john@example.com', status: 'Active' },
  { name: 'Jane', email: 'jane@example.com', status: 'Pending' }
];

<Table columns={columns} data={data} striped hoverable />
```

---

### 5. **Modal** (`components/ui/Modal.js`)
Dialog modal réutilisable

**Props:**
- `isOpen` - Afficher/masquer le modal
- `onClose` - Fonction de fermeture
- `title` - Titre du modal
- `size` - Taille (sm, md, lg, xl)
- `footer` - Contenu du footer
- `closeButton` - Afficher le bouton fermer

**Hook:**
- `useModalState(initialState)` - Gestion d'état simple

**Exemple:**
```jsx
import { Modal, useModalState } from '@/components/ui';

export function MyComponent() {
  const modal = useModalState();

  return (
    <>
      <Button onClick={modal.open}>Open Modal</Button>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Confirm Action"
        footer={
          <>
            <Button variant="secondary" onClick={modal.close}>Cancel</Button>
            <Button onClick={modal.close}>Confirm</Button>
          </>
        }
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}
```

---

### 6. **Badge** (`components/ui/Badge.js`)
Petites étiquettes pour statuts et tags

**Variantes:**
- `primary` - Bleu principal
- `success` - Vert succès
- `warning` - Orange warning
- `error` - Rouge erreur
- `info` - Bleu info
- `secondary` - Gris secondaire

**Tailles:**
- `sm` - Petit
- `md` - Moyen (défaut)
- `lg` - Grand

**Props:**
- `icon` - Icône optionnelle
- `variant` - Variante de couleur
- `size` - Taille du badge

**Exemple:**
```jsx
import { Badge, BadgeGroup } from '@/components/ui';
import { Check } from 'lucide-react';

<BadgeGroup>
  <Badge variant="success" icon={<Check size={14} />}>
    Completed
  </Badge>
  <Badge variant="warning">In Progress</Badge>
  <Badge variant="error">Failed</Badge>
</BadgeGroup>
```

---

## 📍 Import Simplifié

Grâce au fichier `components/ui/index.js`, tu peux importer tous les composants d'une seule ligne:

```jsx
// ✅ Simple
import { Button, Input, Card, Table, Modal, Badge } from '@/components/ui';

// ❌ Long
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
// ... etc
```

---

## 🎨 Design Cohérent

Tous les composants utilisent:
- ✅ Palette de couleurs personnalisée (Tailwind)
- ✅ Typographie Inter
- ✅ Border-radius de 12px par défaut
- ✅ Espacement cohérent
- ✅ Shadows subtiles

---

## 🧪 Page de Démonstration

Accès à: `/components-demo`

Page interactive montrant tous les composants avec:
- Tous les variants
- Tous les états
- Tous les tailles
- Exemples d'usage réels

---

## 💡 Tips d'Utilisation

### Réutiliser les composants:
```jsx
'use client';

import { Button, Input, Card } from '@/components/ui';

export function MyForm() {
  return (
    <Card>
      <h2>Sign Up</h2>
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button onClick={handleSubmit}>Submit</Button>
    </Card>
  );
}
```

### Combiner les composants:
```jsx
<Card variant="elevated">
  <CardHeader title="Users" />
  <CardBody>
    <Table columns={columns} data={userData} />
  </CardBody>
  <CardFooter>
    <Button>Download</Button>
  </CardFooter>
</Card>
```

### États personnalisés:
```jsx
const [isLoading, setIsLoading] = useState(false);

<Button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Save'}
</Button>
```

---

## 📋 Checklist Step 2

- [x] Button component
- [x] Input component
- [x] Card component
- [x] Table component
- [x] Modal component
- [x] Badge component
- [x] Index export
- [x] Demo page
- [x] Documentation

---

## 🎯 Prochaines étapes (Step 3)

**STEP 3 — AUTHENTICATION PAGES**
- [ ] Login page (améliorée)
- [ ] Register page (améliorée)
- [ ] Forgot password page
- [ ] Landing page (améliorée)

Tous les composants créés ici seront utilisés dans les pages d'authentification! 🚀
