# 🎴 Product Card Snippet - Lunetier & Co

## 🎯 Objectif

Créer un système de cartes produits **réutilisable** et **optimisé** dans tout le thème, permettant de :
- ✅ **Réduire la duplication de code** (DRY principle)
- ✅ **Maintenir une apparence cohérente** sur toutes les pages
- ✅ **Faciliter les mises à jour** (1 fichier à modifier au lieu de 10)
- ✅ **Améliorer les performances** avec lazy loading et images responsives

---

## 📚 Fichiers créés

### 1. `snippets/product-card.liquid`

**Snippet principal** contenant la structure HTML de la carte produit.

**Fonctionnalités :**
- Image principale avec hover vers 2ème image
- Badges automatiques (Nouveau, Promo, Épuisé)
- Bouton slide-up au hover
- Prix avec réduction affichée
- Support vendor/marque
- Lazy loading intégré
- Accessible (ARIA labels)

### 2. `assets/product-card.css`

**Styles CSS** pour les cartes produits.

**Inclut :**
- Styles de base pour la carte
- Effets hover (zoom image, slide-up button)
- Badges (3 types : new, sale, sold-out)
- Layout responsive (2 col mobile → 4 col desktop)
- Animations staggerées (fadeInUp)

### 3. `snippets/responsive-image.liquid`

**Snippet d'optimisation d'images** utilisé par product-card.

**Génère automatiquement :**
- Srcset avec plusieurs résolutions (400, 600, 800, 1200, 1600px)
- Attribut `sizes` pour responsive
- Lazy loading
- Fallback SVG placeholder

---

## 🛠️ Utilisation

### Syntaxe de base

```liquid
{% render 'product-card', product: product %}
```

### Avec tous les paramètres

```liquid
{% render 'product-card',
  product: product,
  show_second_image: true,
  show_badge: true,
  show_vendor: true,
  show_quick_view: false,
  image_loading: 'lazy',
  card_class: 'my-custom-class'
%}
```

### Paramètres disponibles

| Paramètre | Type | Défaut | Description |
|------------|------|--------|-------------|
| `product` | Object | **requis** | Objet produit Shopify |
| `show_second_image` | Boolean | `true` | Afficher 2ème image au hover |
| `show_badge` | Boolean | `true` | Afficher badge auto (Nouveau/Promo) |
| `show_vendor` | Boolean | `false` | Afficher marque sous le titre |
| `show_quick_view` | Boolean | `false` | Afficher bouton quick view |
| `image_loading` | String | `'lazy'` | `'lazy'` ou `'eager'` |
| `card_class` | String | `''` | Classes CSS additionnelles |

---

## 📝 Exemples concrets

### 1. Collection featured (3 produits)

```liquid
<div class="lunetier-products-grid lunetier-products-grid--3-col">
  {%- for product in collection.products limit: 3 -%}
    {% render 'product-card',
      product: product,
      show_second_image: true,
      show_badge: true,
      image_loading: 'lazy'
    %}
  {%- endfor -%}
</div>
```

### 2. Page collection avec filtres

```liquid
<div class="lunetier-products-grid">
  {%- for product in collection.products -%}
    {% render 'product-card',
      product: product,
      show_second_image: true,
      show_badge: true,
      show_vendor: true,
      image_loading: 'lazy'
    %}
  {%- endfor -%}
</div>
```

### 3. Produits recommandés (eager loading)

```liquid
<div class="lunetier-products-grid lunetier-products-grid--3-col">
  {%- for product in recommendations.products -%}
    {% render 'product-card',
      product: product,
      show_second_image: true,
      show_badge: false,
      image_loading: 'eager'
    %}
  {%- endfor -%}
</div>
```

### 4. Résultats de recherche

```liquid
<div class="lunetier-products-grid">
  {%- for item in search.results -%}
    {%- if item.object_type == 'product' -%}
      {% render 'product-card',
        product: item,
        show_second_image: false,
        show_badge: true,
        show_vendor: true
      %}
    {%- endif -%}
  {%- endfor -%}
</div>
```

---

## 🎨 Personnalisation

### 1. Modifier l'apparence globale

Éditer le fichier `assets/product-card.css` :

```css
/* Exemple : Changer la forme des images */
.lunetier-card-image-wrapper {
  aspect-ratio: 1 / 1; /* Carré au lieu de 4/5 */
  border-radius: 8px; /* Coins arrondis */
}

/* Exemple : Changer la couleur du bouton */
.lunetier-card-btn {
  background-color: var(--color-accent);
}

/* Exemple : Désactiver le zoom au hover */
.lunetier-card-link:hover .lunetier-card-img-hover {
  transform: scale(1); /* Pas de zoom */
}
```

### 2. Ajouter une classe custom

```liquid
{% render 'product-card',
  product: product,
  card_class: 'featured-product-special'
%}
```

Puis dans votre CSS :

```css
.featured-product-special .lunetier-card-title {
  font-size: 1.5rem;
  color: var(--color-accent);
}
```

### 3. Modifier le badge

Éditer `snippets/product-card.liquid` ligne ~30-60 :

```liquid
{% comment %} Exemple : Ajouter un badge "Best Seller" {% endcomment %}
{% if product.tags contains 'bestseller' %}
  assign badge_text = 'Best Seller'
  assign badge_type = 'bestseller'
{% endif %}
```

Puis ajouter le style dans `product-card.css` :

```css
.lunetier-badge-bestseller {
  background-color: gold;
  color: black;
  opacity: 1;
}
```

---

## ⚙️ Grilles disponibles

### Classes de grille pré-configurées

#### 1. Grille standard (responsive)

```liquid
<div class="lunetier-products-grid">
  <!-- 2 col mobile | 3 col tablet | 4 col desktop -->
</div>
```

#### 2. Grille 3 colonnes max

```liquid
<div class="lunetier-products-grid lunetier-products-grid--3-col">
  <!-- 2 col mobile | 3 col tablet et desktop -->
</div>
```

#### 3. Grille custom

```css
/* Dans votre section CSS */
.my-custom-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .my-custom-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
  }
}
```

---

## 📊 Performance

### Optimisations incluses

1. **Lazy Loading** : Images chargées uniquement quand visibles
2. **Srcset** : Images adaptées à la taille d'écran
3. **CSS externe** : Mis en cache par le navigateur
4. **Animation staggerée** : Apparition progressive des cartes
5. **Prefers-reduced-motion** : Respect des préférences d'accessibilité

### Tests recommandés

```bash
# PageSpeed Insights
https://pagespeed.web.dev/

# Métriques à vérifier :
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- Image optimization score > 90%
```

---

## 🐛 Débogage

### Problème : Images ne s'affichent pas

**Solution :**
```liquid
{% comment %} Vérifier que le produit a des images {% endcomment %}
{% if product.featured_media == blank %}
  <p>Aucune image disponible pour {{ product.title }}</p>
{% endif %}
```

### Problème : Badge ne s'affiche pas

**Vérifier :**
1. Le paramètre `show_badge: true` est bien passé
2. Le produit remplit les conditions (nouveau, promo, etc.)
3. Le CSS `product-card.css` est bien chargé

### Problème : Hover ne fonctionne pas

**Vérifier :**
1. Le fichier `product-card.css` est chargé dans le `<head>`
2. Les classes CSS sont bien appliquées (`lunetier-card-link`, etc.)
3. Sur mobile, le hover est désactivé (comportement normal)

---

## 📚 Sections mises à jour

### ✅ Sections déjà refactorisées

- [x] `sections/featured-collection.liquid`
- [x] `sections/collection.liquid`

### ⌛ Sections à mettre à jour

Rechercher dans votre thème toutes les sections qui contiennent des grilles de produits et remplacer par le snippet :

```bash
# Rechercher les sections avec des cartes produits
grep -r "for product in" sections/
grep -r "product.featured_image" sections/
```

Sections potentielles :
- `sections/search.liquid`
- `sections/related-products.liquid`
- `sections/recommendations.liquid`
- Toute section custom avec des produits

---

## 🚀 Prochaines évolutions possibles

### 1. Quick View Modal

Ajouter un bouton pour voir le produit sans changer de page :

```liquid
{% render 'product-card',
  product: product,
  show_quick_view: true
%}
```

### 2. Ajout au panier direct

Transformer le bouton en "Add to Cart" avec AJAX :

```javascript
// Dans theme.js
function addToCartFromCard(variantId) {
  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: variantId, quantity: 1 })
  })
  .then(res => res.json())
  .then(data => {
    // Mise à jour du panier
  });
}
```

### 3. Wishlist / Favoris

Ajouter un bouton cœur pour sauvegarder les produits :

```liquid
<button class="wishlist-btn" data-product-id="{{ product.id }}">
  <svg>...</svg>
</button>
```

### 4. Swatches de couleurs

Afficher les variantes de couleur sous l'image :

```liquid
<div class="product-swatches">
  {%- for option in product.options_with_values -%}
    {%- if option.name == 'Couleur' -%}
      {%- for value in option.values -%}
        <span class="swatch" style="background-color: {{ value }};"></span>
      {%- endfor -%}
    {%- endif -%}
  {%- endfor -%}
</div>
```

---

## 👥 Support

Pour toute question sur l'utilisation du snippet :

1. Consulter cette documentation
2. Vérifier les exemples ci-dessus
3. Inspecter le code avec DevTools
4. Tester avec des produits différents

**Bon dev ! 🚀**
