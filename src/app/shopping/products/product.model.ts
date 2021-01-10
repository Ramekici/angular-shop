export interface Urun {
  id: string;
  sektor: string;
  isim: string;
  marka: string;
  fiyat: number;
  miktar: number;
  image: {
    image1: string;
    image2: string;
    image3: string;
  };
  aciklama: string;
  indirim: number;
  renk: {
    renk1: string;
    renk2: string;
    renk3: string;
  };
}
