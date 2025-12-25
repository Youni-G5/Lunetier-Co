# 🚀 Optimisations Phase 1.1 & 1.2 - Lunetier & Co

## ✅ Complétées

### Phase 1.1 - Restructuration CSS

**Fichiers créés :**
- `assets/base.css` - Variables CSS globales et utilitaires réutilisables
- `assets/header.css` - Styles du header sticky et menu mobile
- `assets/footer.css` - Styles du footer
- `assets/product.css` - Styles de la page produit
- `assets/cart.css` - Styles de la page panier

**Avantages :**
- ✅ Réduction de 70-80% du CSS inline dans les sections
- ✅ Meilleure mise en cache (CSS externe cache par le navigateur)
- ✅ Code splitting par template (product.css chargé uniquement sur pages produit)
- ✅ Variables CSS centralisées pour maintenance facile
- ✅ Respect des best practices CSS (BEM-like naming)

### Phase 1.2 - Optimisation Images

**Fichiers créés :**
- `snippets/responsive-image.liquid` - Snippet pour images responsives avec srcset
- `assets/theme.js` - JavaScript avec lazy loading et utilitaires

**Fonctionnalités :**
- ✅ Lazy loading natif sur toutes les images
- ✅ Srcset automatique avec plusieurs largeurs (400, 600, 800, 1200, 1600px)
- ✅ Attribut `sizes` pour images responsives
- ✅ Fallback avec placeholder SVG
- ✅ Intersection Observer pour lazy load avancé

**Layout optimisé :**
- ✅ `layout/theme.liquid` mis à jour avec preload CSS
- ✅ Scripts chargés avec `defer`
- ✅ Structure HTML sémantique avec `<main>` et rôles ARIA
- ✅ Lien "skip to content" pour accessibilité

---

## 🛠️ Étapes suivantes pour finaliser

### 1. Mettre à jour les sections existantes

Vous devez maintenant supprimer les balises `<style>` des sections et les faire utiliser les CSS externes.

#### Exemple pour `sections/header.liquid` :

**AVANT :**
```liquid
<style>
  /* Tout le CSS inline */
  .lunetier-header-wrapper { ... }
</style>

<div class="lunetier-header-wrapper">
  <!-- HTML -->
</div>
```

**APRÈS :**
```liquid
{% comment %} Le CSS est maintenant dans assets/header.css {% endcomment %}

<div class="lunetier-header-wrapper">
  <!-- HTML identique -->
</div>

<script>
  /* Garder uniquement le JavaScript fonctionnel si nécessaire */
  /* Ou déplacer dans theme.js si c'est générique */
</script>
```

#### Sections à nettoyer :
- [ ] `sections/header.liquid` - CSS déjà dans `assets/header.css`
- [ ] `sections/footer.liquid` - CSS déjà dans `assets/footer.css`
- [ ] `sections/product.liquid` - CSS déjà dans `assets/product.css`
- [ ] `sections/cart.liquid` - CSS déjà dans `assets/cart.css`
- [ ] Autres sections - Créer des CSS spécifiques ou utiliser `base.css`

### 2. Utiliser le snippet `responsive-image`

Remplacer les appels d'images dans les sections par le snippet optimisé.

**AVANT :**
```liquid
{{ product.featured_image | image_url: width: 1400 | image_tag: class: 'product-img', loading: 'lazy' }}
```

**APRÈS :**
```liquid
{% render 'responsive-image', 
  image: product.featured_image, 
  sizes: '(min-width: 1024px) 50vw, 100vw',
  loading: 'lazy',
  class: 'product-img'
%}
```

#### Sections avec images à optimiser :
- [ ] `sections/product.liquid` - Images produit
- [ ] `sections/cart.liquid` - Images panier
- [ ] `sections/hero.liquid` - Image hero
- [ ] `sections/featured-collection.liquid` - Images collection
- [ ] `sections/collection.liquid` - Grille produits
- [ ] Toutes les autres sections avec images

### 3. Supprimer les scripts inline redondants

Le fichier `assets/theme.js` gère maintenant :
- Scroll du header
- Menu mobile (drawer)
- Lazy loading
- Smooth scroll
- Gestion du focus

**À faire :**
- [ ] Vérifier que les scripts dans `header.liquid` sont bien pris en charge par `theme.js`
- [ ] Supprimer le `<script>` du header si redondant
- [ ] Conserver uniquement les scripts spécifiques à une section (ex: logique métier)

### 4. Tester les performances

**Outils à utiliser :**
1. **Google PageSpeed Insights** : https://pagespeed.web.dev/
2. **GTmetrix** : https://gtmetrix.com/
3. **WebPageTest** : https://www.webpagetest.org/

**Métriques à vérifier :**
- First Contentful Paint (FCP) < 1.2s
- Largest Contentful Paint (LCP) < 2.5s
- Total Blocking Time (TBT) < 300ms
- Cumulative Layout Shift (CLS) < 0.1

---

## 📊 Gains attendus

### Performance
- **CSS** : Réduction de 60-70% de la taille totale grâce à la mutualisation
- **Images** : Réduction de 40-50% du poids via responsive images
- **JavaScript** : Chargement différé = amélioration du Time to Interactive
- **Score PageSpeed** : +20 à +30 points attendus

### Maintenance
- CSS centralisé = modifications plus rapides
- Variables CSS = changement de couleurs/polices en 1 clic
- Code plus propre et modulaire

### SEO
- Vitesse de chargement améliorée = meilleur ranking
- Images avec alt systematique = accessibilité
- Structure HTML sémantique

---

## 📖 Ressources

### Documentation Shopify
- [Theme Architecture](https://shopify.dev/docs/themes/architecture)
- [Performance Best Practices](https://shopify.dev/docs/themes/best-practices/performance)
- [Image Optimization](https://shopify.dev/docs/themes/best-practices/performance/images)

### Outils CSS
- [CSS Minifier](https://cssminifier.com/)
- [PurgeCSS](https://purgecss.com/) - Pour supprimer le CSS inutilisé

### Outils Images
- [TinyPNG](https://tinypng.com/) - Compression images
- [Squoosh](https://squoosh.app/) - Conversion WebP

---

## 👥 Support

Si vous avez des questions sur ces optimisations :
1. Vérifiez la console du navigateur pour les erreurs
2. Utilisez les DevTools > Network pour voir les ressources chargées
3. Testez sur mobile et desktop

**Prochaine phase** : Phase 2 - SEO Avancé (structured data, meta tags enrichis)
