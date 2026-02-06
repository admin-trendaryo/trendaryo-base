# Admin Panel Access Guide

## 🔐 Login to Admin Panel

### URL:
```
http://localhost:8081/admin/login
```

### Credentials:
- **Email:** `admin@trendaryo.com`
- **Password:** `password`

### Staff Login (Limited Access):
- **Email:** `staff@trendaryo.com`
- **Password:** `password`

---

## 📊 Admin Panel Features

### 1. Dashboard (`/admin/dashboard`)
- Quick overview of store performance
- Recent activity feed
- Key metrics at a glance

### 2. Overview (`/admin/overview`)
- Sales statistics
- Product inventory status
- Customer insights
- System health

### 3. Products Management (`/admin/products`)
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Bulk upload via CSV
- ✅ Upload product images
- ✅ Manage categories and tags
- ✅ Set stock levels and pricing

### 4. Orders Management (`/admin/orders`)
- View all orders
- Update order status (pending, processing, shipped, delivered)
- Add tracking numbers
- View order details
- Filter and search orders

### 5. Customers Management (`/admin/customers`)
- View customer list
- Customer details and order history
- Update customer status
- Customer statistics

### 6. Content Management (`/admin/content`)
- Edit homepage hero section
- Manage promotional banners
- Update featured products
- Create/edit discount codes
- Customize brand colors and settings

### 7. Analytics Dashboard (`/admin/analytics`)
- Sales reports (7d, 30d, 90d, 1y)
- Revenue charts
- Traffic statistics
- Top products
- Category performance
- Export reports (CSV/PDF)

### 8. Settings Panel (`/admin/settings`) - Admin Only
- Appearance settings (colors, fonts, layout)
- Payment gateway configuration
- Shipping zones and rates
- SEO settings
- Generate sitemap
- Update robots.txt

---

## 🎯 Quick Actions

### Add a New Product:
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill in product details
4. Upload image
5. Set price and stock
6. Click "Save"

### Process an Order:
1. Go to `/admin/orders`
2. Click on order
3. Update status to "Processing"
4. Add tracking number
5. Update to "Shipped"

### Create a Promotion:
1. Go to `/admin/content`
2. Scroll to "Promotions"
3. Click "Add Promotion"
4. Enter discount code and details
5. Save

### Bulk Upload Products:
1. Go to `/admin/products`
2. Click "Bulk Upload"
3. Download CSV template
4. Fill in product data
5. Upload CSV file

---

## 🔒 Access Levels

### Admin Role:
- Full access to all features
- Can modify settings
- Can delete products/orders
- Can manage other admins

### Staff Role:
- View and manage products
- Process orders
- View customers
- View analytics
- Cannot access Settings

---

## 🌐 Production Access

When deployed, access admin at:
```
https://your-domain.com/admin/login
```

**Important:** Change default passwords before going live!

---

## 🆘 Troubleshooting

### Can't Login?
- Check credentials are correct
- Verify environment variables are set
- Check browser console for errors

### Admin Panel Not Loading?
- Ensure backend server is running
- Check API endpoints are accessible
- Verify JWT_SECRET is configured

### Features Not Working?
- Check browser console for errors
- Verify you're logged in
- Ensure you have correct role permissions

---

## 📱 Quick Access

**From Homepage:**
- Scroll to footer
- Click "Admin" link (orange text)
- Login with credentials

**Direct URL:**
- Type `/admin/login` in browser
- Or bookmark the admin login page

---

## 🔐 Security Notes

⚠️ **Before Production:**
1. Change default passwords
2. Use strong passwords (12+ characters)
3. Enable 2FA if available
4. Limit admin access to trusted IPs
5. Regularly update credentials
6. Monitor admin activity logs

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Review server logs
3. Verify environment variables
4. Check network requests in DevTools
5. Refer to DEPLOYMENT.md for setup issues
