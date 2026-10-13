import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-store.html'
})
export class DeviceStoreComponent {
  devices = signal([
    { id: 1, brand: 'Apple', name: 'iPhone 15 Pro Max', price: '89.999', oldPrice: '95.000', tag: 'Yeni', imgUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-select?wid=256&hei=312&fmt=p-jpg&qlt=95&.v=1693086290559' },
    { id: 2, brand: 'Samsung', name: 'Galaxy S24 Ultra', price: '73.999', oldPrice: '79.999', tag: 'Çok Satan', imgUrl: 'https://images.samsung.com/is/image/samsung/p6pim/tr/2401/gallery/tr-galaxy-s24-s928-sm-s928bztqtur-thumb-539420015?$216_216_PNG$' },
    { id: 3, brand: 'Apple', name: 'AirPods Pro (2. Nesil)', price: '9.499', oldPrice: '10.500', tag: 'İndirim', imgUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MTJV3?wid=200&hei=200&fmt=png-alpha&.v=1694014871985' },
    { id: 4, brand: 'Xiaomi', name: 'Redmi Note 13 Pro', price: '18.499', oldPrice: '19.999', tag: null, imgUrl: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705307525.80164673!200x200.png' }
  ]);
  
  showModal = signal<boolean>(false);
  selectedDevice = signal<any>(null);

  openModal(device: any) {
    this.selectedDevice.set(device);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedDevice.set(null);
  }
}
