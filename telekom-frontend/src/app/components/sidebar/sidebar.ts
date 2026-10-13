import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SubMenuItem {
  label: string;
  route: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  submenus?: SubMenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  activeMenu = signal<string | null>(null);

  menuItems: MenuItem[] = [
    { id: 'fatura', label: 'Fatura İşlemleri', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z', submenus: [
      { label: 'Fatura Öde', route: '/fatura/ode' },
      { label: 'Geçmiş Faturalarım', route: '/fatura/gecmis' },
      { label: 'Fatura Ayarları', route: '/fatura/ayarlar' }
    ]},
    { id: 'tarife', label: 'Tarife ve Paketlerim', icon: 'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', submenus: [
      { label: 'Mevcut Tarifem', route: '/tarife/mevcut' },
      { label: 'Tarife Değişikliği', route: '/tarife/degisiklik' },
      { label: 'Ek Paket Al', route: '/tarife/ek-paket' },
      { label: 'Kendi Paketini Yarat', route: '/custom-package' }
    ]},
    { id: 'odeme', label: 'Ödeme ve TL İşlemlerim', icon: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V4.245c0-.754-.726-1.294-1.453-1.096a60.07 60.07 0 0 1-15.797 2.101c-.699.03-.699 1.055 0 1.085A57.065 57.065 0 0 0 14.25 6v12a57.065 57.065 0 0 0-12.003-.365c-.699.03-.699 1.055 0 1.085Z', submenus: [
      { label: 'TL Yükle', route: '/odeme/tl-yukle' },
      { label: 'Mobil Ödeme Ayarları', route: '/odeme/mobil' },
      { label: 'Kayıtlı Kartlarım', route: '/odeme/kartlar' },
      { label: 'Kredi Kartı ile Paket Al', route: '/odeme/kredi-karti' }
    ]},
    { id: 'abonelik', label: 'Abonelik ve Hat İşlemlerim', icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z', submenus: [
      { label: 'Telefon Ayarları', route: '/abonelik/telefon-ayarlari' },
      { label: 'e-SIM\'e Geçiş', route: '/abonelik/esim' },
      { label: 'Yurt Dışı Ayarları', route: '/abonelik/yurtdisi' },
      { label: 'Kayıp Çalıntı Kapama', route: '/abonelik/kayip-calinti' },
      { label: 'İzin Ayarları', route: '/abonelik/izin' },
      { label: 'Numara Değişikliği', route: '/abonelik/numara' },
      { label: 'Hat Devretme', route: '/abonelik/devir' },
      { label: 'Bilgilendirme Mesajları', route: '/abonelik/bilgi' },
      { label: 'Abonelik İptal İşlemleri', route: '/abonelik/iptal' },
      { label: 'İşlem Kayıtlarım', route: '/abonelik/kayitlar' },
      { label: 'Abonelik Tercihleri', route: '/abonelik/tercihler' }
    ]},
    { id: 'dijital', label: 'Dijital Ürün ve Servisler', icon: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3', submenus: [
      { label: 'Tüm Dijital Ürünler', route: '/dijital/tum' }
    ]},
    { id: 'servis', label: 'Servis İşlemlerim', icon: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z', submenus: [
      { label: 'Tüm Servisler', route: '/servis/tum' },
      { label: 'Servislerim', route: '/servis/benim' },
      { label: 'Size Özel Kampanyalar', route: '/servis/kampanya' },
      { label: 'LiraPaylaş', route: '/servis/lirapaylas' },
      { label: '11855 Rehber Servisi', route: '/servis/rehber' },
      { label: 'Hediye İnternet', route: '/servis/hediye-net' },
      { label: 'Şebeke İçi mi?', route: '/servis/sebeke-ici' },
      { label: 'ArayanıBil Servisi', route: '/servis/arayanibil' }
    ]},
    { id: 'cihaz-al', label: 'Cihaz Satın Al', icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z', route: '/cihaz-satin-al' },
    { id: 'firsat', label: 'Net Fırsatlar', icon: 'M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z', route: '/firsat' },
    { id: 'kisisel', label: 'Kişisel Bilgilerim', icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z', submenus: [
      { label: 'Kişisel Bilgiler', route: '/kisisel/bilgiler' },
      { label: 'Hat Bilgileri', route: '/kisisel/hat' },
      { label: 'Puk Bilgisi', route: '/kisisel/puk' },
      { label: 'Abonelik Form ve Sözleşmeleri', route: '/kisisel/sozlesme' },
      { label: 'Bize Ulaşın', route: '/kisisel/iletisim' }
    ]},
    { id: 'cihazlarim', label: 'Cihazlarım', icon: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3', route: '/cihazlarim' },
    { id: 'guvenli', label: 'Güvenli İnternet', icon: 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z', route: '/guvenli-internet' },
    { id: 'sikayet', label: 'Tüketici Şikayetleri', icon: 'M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z', route: '/sikayet' },
    { id: 'yeni-abonelik', label: 'Yeni Abonelik Başvurusu', icon: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', submenus: [
      { label: 'Mobil', route: '/yeni-abonelik/mobil' },
      { label: 'Evde İnternet', route: '/yeni-abonelik/internet' },
      { label: 'Tivibu', route: '/yeni-abonelik/tivibu' }
    ]}
  ];

  toggleMenu(menuId: string, hasSubmenus: boolean) {
    if (!hasSubmenus) return;
    
    if (this.activeMenu() === menuId) {
      this.activeMenu.set(null);
    } else {
      this.activeMenu.set(menuId);
    }
  }
}

