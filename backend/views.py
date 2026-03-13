from django.http import JsonResponse
from .models import MenuItem, Order, OrderLine
import json

# 1. Enviar o menu para o cliente (Frontend)
def get_menu(request):
    items = list(MenuItem.objects.values())
    return JsonResponse(items, safe=False)

# 2. Receber o pedido que o cliente fez
def create_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Cria o pedido com o número da mesa
        new_order = Order.objects.create(table_number=data['table_number'])
        
        # Adiciona cada prato ao pedido
        for item in data['items']:
            menu_item = MenuItem.objects.get(id=item['id'])
            OrderLine.objects.create(
                order=new_order, 
                menu_item=menu_item, 
                quantity=item['quantity']
            )
        return JsonResponse({'status': 'success', 'order_id': new_order.id})

# 3. Mudar o pedido de coluna (ex: de 'Preparing' para 'Ready')
def update_order_status(request, order_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        order = Order.objects.get(id=order_id)
        order.status = data['status']
        order.save()
        return JsonResponse({'status': 'updated'})
