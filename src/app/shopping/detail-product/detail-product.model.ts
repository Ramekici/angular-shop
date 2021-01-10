export interface DetailP {
  id: string;
  sektor: string;
  isim: string;
  marka: string;
  fiyat: number;
  miktar: number;
  aciklama: string;
  indirim: number;
  renk: {
    renk1: string;
    renk2: string;
    renk3: string;
  };
  imagePath: string;
  date: number;
  yorumlar: [{
    baslik: string;
    metin: string;
    puan: number;
    name: string;
    date: Date;
  }];
}
