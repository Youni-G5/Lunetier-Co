# 🚀 Guide SEO - Lunetier & Co Theme

## 🎯 Vue d'ensemble

Ce thème Shopify est optimisé pour le référencement naturel (SEO) avec une approche technique et sémantique complète.

---

## ✅ Optimisations Implémentées

### 1. **Meta Tags & Open Graph**

✅ **Snippet `seo-meta-tags.liquid`**
- Meta description dynamique par page
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Meta tags produits (prix, disponibilité)
- Canonical URLs automatiques
- Preconnect vers CDN et fonts
- Robots meta adaptés (noindex sur cart/search)

**Localisation** : `snippets/seo-meta-tags.liquid`

#### Utilisation
```liquid
{% render 'seo-meta-tags' %}
```

**Génère automatiquement** :
- Page produit : `{Product Title} | {Shop Name}`
- Collection : `{Collection Title} | {Shop Name}`
- Article : `{Article Title} | {Shop Name}`
- Page : `{Page Title} | {Shop Name}`

---

### 2. **Structured Data (Schema.org)**

✅ **Snippet `schema-org.liquid`**

Implemente JSON-LD pour :

#### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Lunetier & Co",
  "logo": "...",
  "sameAs": ["Facebook", "Instagram", "Twitter"]
}
```

#### Product Schema
```json
{
  "@type": "Product",
  "name": "Lunettes Modèle X",
  "offers": {
    "price": "149",
    "priceCurrency": "EUR",
    "availability": "InStock"
  },
  "aggregateRating": {
    "ratingValue": "4.8",
    "reviewCount": "48"
  }
}
```

#### BreadcrumbList
Pour améliorer la navigation dans les SERP Google.

**Test** : [Google Rich Results Test](https://search.google.com/test/rich-results)

---

### 3. **Performance SEO**

✅ **Optimisations de chargement**

#### Stratégie CSS
1. **Critical CSS inline** (variables uniquement)
2. **Base CSS preload** (base.css avec variables et utilitaires)
3. **CSS par template** (product.css, cart.css, etc.)
4. **Chargement conditionnel** (product-card.css uniquement sur pages avec grilles)

#### Stratégie JavaScript
1. **Script unique** : `theme.js` (7.7KB)
2. **Defer** sur tous les scripts non-critiques
3. **Pas de JavaScript inline** (100% externalisé)

#### Images
1. **Responsive Images** : `responsive-image.liquid` snippet
   - Srcset automatique (5 largeurs)
   - Sizes attribute pour responsive
   - Lazy loading natif
   - Fallback SVG placeholder

2. **Formats optimisés**
   - WebP automatique via Shopify CDN
   - Images redimensionnées à la volée

#### Preconnect & DNS-Prefetch
```html
<link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com" crossorigin>
```

---

### 4. **Accessibilité (A11y = SEO)**

✅ **Standards WCAG 2.1**

- **Skip to content** : Navigation au clavier
- **ARIA labels** : Sur tous les boutons/liens
- **Alt text** : Toutes les images ont un texte alternatif
- **Semantic HTML** : `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`
- **Focus management** : Drawer, modals avec focus trap
- **Prefers-reduced-motion** : Support des préférences utilisateur

---

### 5. **Structure HTML Sémantique**

✅ **Hiérarchie des titres**

```html
<h1> - Titre principal (1 par page)
<h2> - Sections principales
<h3> - Sous-sections
<h4> - Détails
```

**Exemple page produit** :
```html
<h1>Nom du produit</h1>
<h2>Description & Conception</h2>
<h2>Dimensions</h2>
<h2>Livraison & Retours</h2>
```

---

## 📊 Métriques Core Web Vitals

### Objectifs Performance

| Métrique | Cible | Importance |
|----------|-------|------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 🔴 Critique |
| **FID** (First Input Delay) | < 100ms | 🔴 Critique |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 🔴 Critique |
| **FCP** (First Contentful Paint) | < 1.8s | 🟠 Important |
| **TTI** (Time to Interactive) | < 3.8s | 🟠 Important |
| **TBT** (Total Blocking Time) | < 200ms | 🟡 Moyen |

### Optimisations pour Core Web Vitals

#### LCP Amélioré
- ✅ Images hero avec `loading="eager"`
- ✅ Preload des CSS critiques
- ✅ Preconnect vers CDN
- ✅ Images responsive avec srcset

#### FID Amélioré
- ✅ JavaScript defer
- ✅ Pas de scripts bloquants
- ✅ Code JavaScript optimisé (7.7KB total)

#### CLS Amélioré
- ✅ Aspect-ratio sur toutes les images
- ✅ Dimensions réservées dans le CSS
- ✅ Fonts preloadées (pas de FOIT)

---

## 🔍 Outils de Test SEO

### Google Tools
1. **[PageSpeed Insights](https://pagespeed.web.dev/)** - Performance & Core Web Vitals
2. **[Rich Results Test](https://search.google.com/test/rich-results)** - Schema.org validation
3. **[Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)** - Responsive check
4. **[Search Console](https://search.google.com/search-console)** - Indexation & erreurs

### Autres Outils
5. **[GTmetrix](https://gtmetrix.com/)** - Performance détaillée
6. **[WebPageTest](https://www.webpagetest.org/)** - Tests avancés
7. **[Schema Markup Validator](https://validator.schema.org/)** - Validation JSON-LD
8. **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Audit complet

---

## ⚙️ Configuration Shopify Recommandée

### 1. **Paramètres SEO de base**

**Admin Shopify > Boutique en ligne > Préférences**

- ✅ Titre de la page d'accueil : "Lunetier & Co | Lunettes Design Français"
- ✅ Meta description : 150-160 caractères avec mots-clés
- ✅ Google Analytics configuré
- ✅ Google Search Console connecté

### 2. **Titres & Descriptions Produits**

#### Structure recommandée :
```
Titre : [Nom Modèle] - [Type] - [Caractéristique Unique]
Exemple : "Solaris Pro - Lunettes de Soleil Polarisées UV400"

Description :
- Paragraphe 1 : Bénéfices client (150-200 mots)
- Paragraphe 2 : Caractéristiques techniques
- Paragraphe 3 : Matériaux et qualité
- Paragraphe 4 : Garantie et retours
```

#### Mots-clés cibles :
- Lunettes de soleil [marque]
- Lunettes optique [style]
- Lunettes design français
- Lunettes [forme visage]
- Lunettes UV400 polarisées

### 3. **URLs Optimisées**

✅ **Structure recommandée** :
```
Produit : /products/nom-modele-descriptif
Collection : /collections/lunettes-soleil
Article : /blogs/actualites/titre-article
```

❌ **À éviter** :
```
/products/product-12345
/collections/collection-1
```

### 4. **Alt Text Images**

**Formule** : `[Marque] [Modèle] [Type] [Couleur] [Vue]`

**Exemples** :
- "Lunetier Co Solaris Lunettes de Soleil Noir Face"
- "Lunetier Co Solaris Lunettes de Soleil Noir Profil"
- "Lunetier Co Solaris Lunettes de Soleil Noir Portées"

---

## 📝 Checklist SEO Post-Installation

### Configuration Initiale

- [ ] **Google Search Console** connecté
- [ ] **Google Analytics 4** installé
- [ ] **Sitemap XML** soumis (`/sitemap.xml`)
- [ ] **Robots.txt** vérifié (`/robots.txt`)
- [ ] **Favicon** uploadé (180x180px minimum)

### Contenu

- [ ] **Titre boutique** optimisé (< 60 caractères)
- [ ] **Meta description** rédigée (150-160 caractères)
- [ ] **Tous les produits** ont des descriptions uniques (300+ mots)
- [ ] **Toutes les images** ont un alt text descriptif
- [ ] **URLs** sont lisibles et descriptives
- [ ] **Collections** ont des descriptions (200+ mots)

### Technique

- [ ] **HTTPS** activé (obligatoire Shopify)
- [ ] **Responsive** testé sur mobile
- [ ] **PageSpeed score** > 80 (mobile & desktop)
- [ ] **Schema.org** validé sur Google Rich Results Test
- [ ] **Pas d'erreurs 404** dans Search Console
- [ ] **Liens internes** optimisés

### Réseaux Sociaux

- [ ] **Open Graph** testé sur [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] **Twitter Card** testée sur [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] **Pinterest Rich Pins** validées
- [ ] **Liens sociaux** ajoutés au footer

### Accessibilité

- [ ] **Lighthouse Accessibility** score > 90
- [ ] **Navigation clavier** fonctionnelle
- [ ] **Contrastes couleurs** WCAG AA minimum
- [ ] **Focus visible** sur tous les éléments interactifs

---

## 📈 Suivi & Amélioration Continue

### KPIs à suivre

1. **Trafic Organique** (Google Analytics)
   - Sessions organiques / mois
   - Taux de rebond < 50%
   - Durée session > 2min

2. **Positions SERP** (Search Console)
   - Position moyenne < 10
   - CTR > 3%
   - Impressions en croissance

3. **Core Web Vitals** (Search Console)
   - URLs "Bonnes" > 90%
   - LCP, FID, CLS dans le vert

4. **Indexation** (Search Console)
   - Toutes les pages importantes indexées
   - 0 erreurs d'exploration

### Actions mensuelles

- [ ] Vérifier Search Console pour erreurs
- [ ] Analyser pages les mieux positionnées
- [ ] Optimiser 3-5 pages sous-performantes
- [ ] Ajouter du contenu frais (blog)
- [ ] Mettre à jour produits saisonniers
- [ ] Vérifier backlinks (liens entrants)

---

## 🔗 Ressources Utiles

### Documentation Shopify
- [SEO for Shopify](https://help.shopify.com/en/manual/promoting-marketing/seo)
- [Theme Performance](https://shopify.dev/docs/themes/best-practices/performance)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)

### Guides SEO
- [Google Search Central](https://developers.google.com/search)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Ahrefs SEO Guide](https://ahrefs.com/seo)

### Outils de Mots-clés
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/)
- [Ubersuggest](https://neilpatel.com/ubersuggest/)
- [Answer The Public](https://answerthepublic.com/)

---

## ⚙️ Support

Pour toute question sur le SEO du thème :

1. Vérifiez ce guide complet
2. Consultez la documentation Shopify
3. Testez avec les outils Google recommandés
4. Contactez le développeur du thème

---

**Version** : 1.0.0  
**Dernière mise à jour** : 26 décembre 2025  
**Compatibilité** : Shopify 2.0 (Online Store 2.0)
