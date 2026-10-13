import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { TariffsComponent } from './pages/tariffs/tariffs';
import { CustomPackageComponent } from './pages/custom-package/custom-package';
import { LayoutComponent } from './components/layout/layout';
import { LoginComponent } from './pages/login/login';

import { CurrentTariffComponent } from './pages/tariff-operations/current-tariff';
import { ChangeTariffComponent } from './pages/tariff-operations/change-tariff';
import { ExtraPackagesComponent } from './pages/tariff-operations/extra-packages';
import { TopUpComponent } from './pages/payments/top-up';
import { LostStolenComponent } from './pages/subscription/lost-stolen';

import { GenericActionComponent } from './pages/generic/generic-action';
import { GenericSettingsComponent } from './pages/generic/generic-settings';
import { GenericInfoComponent } from './pages/generic/generic-info';

import { SavedCardsComponent } from './pages/payments/saved-cards';
import { BuyWithCardComponent } from './pages/payments/buy-with-card';

import { ChangeNumberComponent } from './pages/subscription/change-number';
import { TransferCancelComponent } from './pages/subscription/transfer-cancel';
import { PreferencesComponent } from './pages/subscription/preferences';

import { DigitalServicesComponent } from './pages/services/digital-services';
import { NetOpportunitiesComponent } from './pages/services/net-opportunities';
import { ServiceFormsComponent } from './pages/services/service-forms';
import { WheelOfFortuneComponent } from './pages/services/wheel-of-fortune';
import { DeviceStoreComponent } from './pages/services/device-store';

import { ProfileSettingsComponent } from './pages/user/profile-settings';
import { NewApplicationComponent } from './pages/user/new-application';
import { LineDetailsComponent } from './pages/user/line-details';
import { PukInfoComponent } from './pages/user/puk-info';
import { ContractsComponent } from './pages/user/contracts';
import { ContactUsComponent } from './pages/user/contact-us';

import { PayBillComponent } from './pages/billing/pay-bill';
import { InvoiceHistoryComponent } from './pages/billing/invoice-history';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tariffs', component: TariffsComponent },
      { path: 'custom-package', component: CustomPackageComponent },
      
      // Fatura İşlemleri
      { path: 'fatura/ode', component: PayBillComponent },
      { path: 'fatura/gecmis', component: InvoiceHistoryComponent },
      { path: 'fatura/ayarlar', component: GenericSettingsComponent, data: { title: 'Fatura Ayarları', settingsList: [{id: 'e-fatura', label: 'E-Fatura', description: 'Faturalarınız e-posta ile gelsin.'}, {id: 'sms-fatura', label: 'SMS Fatura', description: 'Fatura bilgileri SMS ile gelsin.'}] } },
      
      // Tarife ve Paketlerim
      { path: 'tarife/mevcut', component: CurrentTariffComponent },
      { path: 'tarife/degisiklik', component: ChangeTariffComponent },
      { path: 'tarife/ek-paket', component: ExtraPackagesComponent },

      // Ödeme ve TL İşlemlerim
      { path: 'odeme/tl-yukle', component: TopUpComponent },
      { path: 'odeme/mobil', component: GenericSettingsComponent, data: { title: 'Mobil Ödeme Ayarları', settingsList: [{id: 'mobil-odeme', label: 'Mobil Ödeme', description: 'Hattınızı Google Play, AppStore alışverişlerine açın.'}] } },
      { path: 'odeme/kartlar', component: SavedCardsComponent },
      { path: 'odeme/kredi-karti', component: BuyWithCardComponent },

      // Abonelik ve Hat İşlemlerim (Settings)
      { path: 'abonelik/telefon-ayarlari', component: GenericSettingsComponent, data: { title: 'Telefon Ayarları', settingsList: [{id: 'arayanibil', label: 'ArayanıBil Servisi', description: 'Telefonunuz kapalıyken kimin aradığını görün.'}, {id: 'gizli-numara', label: 'Gizli Numaralara Kapat', description: 'Gizli numaralardan gelen aramaları engelleyin.'}] } },
      { path: 'abonelik/esim', component: GenericSettingsComponent, data: { title: 'e-SIM Geçiş', settingsList: [{id: 'esim-aktif', label: 'e-SIM Profili', description: 'Fiziksel SIM kartınızı e-SIM ile değiştirin.'}] } },
      { path: 'abonelik/yurtdisi', component: GenericSettingsComponent, data: { title: 'Yurt Dışı Ayarları', settingsList: [{id: 'roaming', label: 'Uluslararası Dolaşım', description: 'Yurt dışında kullanım yapabilmek için açın.'}, {id: 'yurtdisi-arama', label: 'Yurt Dışını Arama', description: 'Türkiye içindeyken yurt dışını aramaya izin verin.'}] } },
      { path: 'abonelik/kayip-calinti', component: LostStolenComponent },
      { path: 'abonelik/izin', component: GenericSettingsComponent, data: { title: 'İzin Ayarları', settingsList: [{id: 'kampanya-sms', label: 'Kampanya SMS İzni', description: 'Avantajlı kampanyalardan haberdar olmak ister misiniz?'}, {id: 'veri-isleme', label: 'Veri İşleme İzni', description: 'Kullanım verilerinizin size özel teklifler için analiz edilmesi.'}] } },
      { path: 'abonelik/numara', component: ChangeNumberComponent },
      { path: 'abonelik/devir', component: TransferCancelComponent },
      { path: 'abonelik/bilgi', component: GenericSettingsComponent, data: { title: 'Bilgilendirme Tercihleri', settingsList: [{id: 'limit-uyari', label: 'Limit Uyarısı (%80)', description: 'Paket kullanımınız %80\'e ulaştığında SMS gelsin.'}] } },
      { path: 'abonelik/iptal', component: TransferCancelComponent },
      { path: 'abonelik/kayitlar', component: GenericInfoComponent, data: { title: 'İşlem Kayıtları', infoText: 'Son 1 yılda yaptığınız tarife, paket ve abonelik işlemleri geçmişi.' } },
      { path: 'abonelik/tercihler', component: PreferencesComponent },

      // Servis İşlemleri & Dijital Ürünler
      { path: 'dijital/tum', component: DigitalServicesComponent },
      { path: 'servis/tum', component: DigitalServicesComponent },
      { path: 'servis/benim', component: GenericSettingsComponent, data: { title: 'Kullandığım Servisler', settingsList: [{id: 'muud-premium', label: 'Muud Premium', description: 'Sınırsız müzik dinleme servisi.'}, {id: 'tivibu-go', label: 'Tivibu GO Süper', description: 'Her yerde TV izleme keyfi.'}] } },
      { path: 'servis/kampanya', component: GenericInfoComponent, data: { title: 'Size Özel Kampanyalar', infoText: 'Şu an hesabınıza tanımlanmış aktif bir kampanya bulunamadı.' } },
      { path: 'servis/lirapaylas', component: ServiceFormsComponent },
      { path: 'servis/rehber', component: GenericSettingsComponent, data: { title: '11855 Rehber Servisi', settingsList: [{id: 'rehber-11855', label: '11855 Servisi Aktif', description: '11855 üzerinden sorgulama yapabilme izni.'}] } },
      { path: 'servis/hediye-net', component: WheelOfFortuneComponent },
      { path: 'servis/sebeke-ici', component: ServiceFormsComponent },
      { path: 'servis/arayanibil', component: GenericSettingsComponent, data: { title: 'ArayanıBil Servisi', settingsList: [{id: 'arayanibil-servis', label: 'ArayanıBil Plus', description: 'Telefonunuz kapalıyken kimin aradığını SMS ile öğrenin.'}] } },

      // Bilgi Sayfaları (Generic Info / Action)
      { path: 'kisisel/bilgiler', component: ProfileSettingsComponent },
      { path: 'kisisel/hat', component: LineDetailsComponent },
      { path: 'kisisel/puk', component: PukInfoComponent },
      { path: 'kisisel/sozlesme', component: ContractsComponent },
      { path: 'kisisel/iletisim', component: ContactUsComponent },
      
      { path: 'cihaz-satin-al', component: DeviceStoreComponent },
      { path: 'firsat', component: NetOpportunitiesComponent },
      { path: 'cihazlarim', component: GenericInfoComponent, data: { title: 'Cihazlarım', infoText: 'Sistemde adınıza kayıtlı bir taksitli cihaz bulunmamaktadır.' } },
      { path: 'guvenli-internet', component: GenericSettingsComponent, data: { title: 'Güvenli İnternet', settingsList: [{id: 'aile-profili', label: 'Aile Profili', description: 'Zararlı içerikleri engelleyen güvenli internet profili.'}, {id: 'cocuk-profili', label: 'Çocuk Profili', description: 'Sadece güvenli sitelere erişim sağlayan profil.'}] } },
      { path: 'sikayet', component: GenericInfoComponent, data: { title: 'Tüketici Şikayetleri', infoText: 'Tüketici Hakem Heyeti başvuru numaralarınız ve durumları.' } },

      // Yeni Abonelik
      { path: 'yeni-abonelik/mobil', component: NewApplicationComponent, data: { title: 'Yeni Mobil Hat Başvurusu' } },
      { path: 'yeni-abonelik/internet', component: NewApplicationComponent, data: { title: 'Evde İnternet Başvurusu' } },
      { path: 'yeni-abonelik/tivibu', component: NewApplicationComponent, data: { title: 'Tivibu Başvurusu' } }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
