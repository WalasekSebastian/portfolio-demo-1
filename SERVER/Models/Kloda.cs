using System;

namespace DEMO_1.Models
{
    public class Kloda
    {
        public long id {get;set;}
        public int boks_nr {get;set;}
        public int srednica_min_mm {get;set;}
        public int srednica_max_mm {get;set;}
        public int objetosc_m3 {get;set;}
        public int dlugosc_mm {get;set;}
        public int krzywizna_mm_m {get;set;}
        public long ustawienia_id {get;set;}
        public DateTime czas_pomiaru {get;set;}
        public DateTime czas_logowania {get;set;}
    }
}