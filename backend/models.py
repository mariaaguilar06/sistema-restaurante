from django.db import models

# 1. Os itens que aparecem no Menu
class MenuItem(models.Model):
    CATEGORIES = [
        ('Entradas', 'Entradas'),
        ('Sopas', 'Sopas'),
        ('Carne', 'Carne'),
        ('Peixe', 'Peixe'),
        ('Sobremesa', 'Sobremesa'),
    ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORIES)
    ingredients = models.TextField() # Requisito para a cozinha ver 

# 2. O Pedido da mesa
class Order(models.Model):
    STATUS_CHOICES = [
        ('Order Preview', 'Order Preview'),
        ('Preparing', 'Preparing'),
        ('Cooling Down', 'Cooling Down'),
        ('Ready to Serve', 'Ready to Serve'),
        ('Concluded', 'Concluded'),
    ]
    table_number = models.IntegerField() # Requisito [cite: 55]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Order Preview')
    created_at = models.DateTimeField(auto_now_add=True) # Timestamp obrigatório [cite: 70]

# 3. Os pratos específicos dentro de cada pedido (Order Lines)
class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField() # Quantidade por prato [cite: 69]
