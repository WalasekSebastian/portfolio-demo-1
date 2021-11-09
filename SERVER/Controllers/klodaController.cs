using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DEMO_1.Models;
using DEMO_1.Context;
using System.Linq;
using System.Collections.Generic;
using System.Web;
using Newtonsoft.Json;

namespace DEMO_1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class KlodaController : Controller
    {
        private IConfiguration _config;
        private readonly KlodaContext _context;
        public KlodaController(IConfiguration config, KlodaContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll(PagingParameter pagingparametermodel)
        {
            try
            {
                var source = (from customer in _context.WGA_KLODA.  
                    OrderByDescending(a => a.id)  
                  select customer).AsQueryable();  
  
                // Get's No of Rows Count   
                int count = source.Count();  
            
                // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
                int CurrentPage = pagingparametermodel.pageNumber;  
            
                // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
                int PageSize = pagingparametermodel.pageSize;  
            
                // Display TotalCount to Records to User  
                int TotalCount = count;  
            
                // Calculating Totalpage by Dividing (No of Records / Pagesize)  
                int TotalPages = (int)Math.Ceiling(count / (double)PageSize);  
            
                // Returns List of Customer after applying Paging   
                var km = source.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();    
                // Returing List of Customers Collections  

                List<KlodaMetry> items = new List<KlodaMetry>();
            
                foreach(var x in km)
                {
                    KlodaMetry kl = new KlodaMetry();
                    kl.id = x.id;
                    kl.boks_nr = x.boks_nr;
                    kl.srednica_min_mm = x.srednica_min_mm;
                    kl.srednica_max_mm = x.srednica_max_mm;
                    kl.objetosc_m3 = (double)x.objetosc_m3 / 10000;
                    kl.dlugosc_mm = x.dlugosc_mm;
                    kl.krzywizna_mm_m = x.krzywizna_mm_m;
                    kl.ustawienia_id = x.ustawienia_id;
                    kl.czas_pomiaru = x.czas_pomiaru;
                    kl.czas_logowania = x.czas_logowania;
                    items.Add(kl);
                }
                return Ok(new {TotalCount, items});
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("getHistoryKlodDates/{dateFrom}/{dateTo}")]
        public IActionResult GetHistoryKlodDates(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                List<Kloda> listaKlod = _context.WGA_KLODA.Where(i => i.czas_pomiaru >= dateFrom && i.czas_pomiaru <= dateTo).OrderBy(k => k.id).ToList();
                List<KlodaCSV> listaCSV = new List<KlodaCSV>();

                foreach(var x in listaKlod)
                {
                    KlodaCSV c = new KlodaCSV();
                    c.ID = x.id;
                    c.boks = x.boks_nr;
                    c.srednica = x.srednica_min_mm.ToString() + " / " + x.srednica_max_mm.ToString();
                    c.objetosc = (double)x.objetosc_m3 / 10000;
                    c.dlugosc = x.dlugosc_mm;
                    c.data = x.czas_pomiaru.ToString();
                    listaCSV.Add(c);
                }

                return Ok(listaCSV);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("last", Name="KlodaLast")]
        public IActionResult GetLast()
        {
            try
            {
                Kloda kloda = _context.WGA_KLODA.OrderByDescending(k => k.id).Single();
                return Ok(kloda);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("{id}", Name="KlodaGetById")]
        public IActionResult GetById(long id)
        {
            try
            {
                var kloda = _context.WGA_KLODA.Where(u=> u.id == id).Single();
                return Ok(kloda);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("last5", Name="KlodaGetLast5")]
        public IActionResult GetLast5()
        {
            try
            {
                var klodas = _context.WGA_KLODA.OrderByDescending(u => u.id).Take(5);
                List<KlodaMetry> km = new List<KlodaMetry>();
            
                foreach(var x in klodas)
                {
                    KlodaMetry kl = new KlodaMetry();
                    kl.id = x.id;
                    kl.boks_nr = x.boks_nr;
                    kl.srednica_min_mm = x.srednica_min_mm;
                    kl.srednica_max_mm = x.srednica_max_mm;
                    kl.objetosc_m3 = (double)x.objetosc_m3 / 10000;
                    kl.dlugosc_mm = x.dlugosc_mm;
                    kl.krzywizna_mm_m = x.krzywizna_mm_m;
                    kl.ustawienia_id = x.ustawienia_id;
                    kl.czas_pomiaru = x.czas_pomiaru;
                    kl.czas_logowania = x.czas_logowania;
                    km.Add(kl);
                }
                return Ok(km);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("ustawieniaId/{id}", Name="KlodaGetByUstawienia")]
        public IActionResult GetByUstawieniaId(long id)
        {
            try
            {
                var klodas = _context.WGA_KLODA.Where(k => k.ustawienia_id == id).ToList();
                return Ok(klodas);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("iloscmetrow", Name="IloscMetrowZDzis")]
        public IActionResult GetIloscMetrow()
        {
            try
            {
                double ilosc=0;

                List<Kloda> lista = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == DateTime.Now.Date && i.boks_nr == 5).ToList();

                foreach(var x in lista)
                {
                    ilosc += x.objetosc_m3;
                }
                var il = ilosc / 10000;
                return Ok(il);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("iloscKlod")]
        public IActionResult GetIloscKlod()
        {
            try
            {
                int ilosc = 0;
                List<Kloda> lista = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == DateTime.Now.Date).ToList();

                foreach(var x in lista)
                {
                    ilosc++;
                }
                return Ok(ilosc);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("sumboxes")]
        public IActionResult GetIloscKlodWBoksach()
        {
            try
            {
                SumBoks sumaKlod = new SumBoks();
                List<Kloda> lista = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == DateTime.Now.Date).ToList();
                foreach(var x in lista)
                {
                    switch(x.boks_nr)
                    {
                        case 1:
                            sumaKlod.boks1++;
                            break;
                        case 2:
                            sumaKlod.boks2++;
                            break;
                        case 3:
                            sumaKlod.boks3++;
                            break;
                        case 4:
                            sumaKlod.boks4++;
                            break;
                        case 5:
                            sumaKlod.trak++;
                            break;
                        default:
                            break;
                    }
                }
                return Ok(sumaKlod);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("imd/{date}")]
        public IActionResult GetIloscMetrowDzien(DateTime date)
        {
            try
            {
                int ilosc=0;
                List<Kloda> lista = _context.WGA_KLODA.Where(d => d.czas_pomiaru.Date == date).ToList();
                foreach(var x in lista)
                {
                    ilosc += x.objetosc_m3;
                }
                double i = (double)ilosc / 10000;
                return Ok(i);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("ikd/{date}")]
        public IActionResult GetIloscKlodDzine(DateTime date)
        {
            try
            {
                int ilosc = 1;
                List<Kloda> lista = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == date).ToList();

                foreach(var x in lista)
                {
                    ilosc++;
                }
                return Ok(ilosc-1);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("smbd/{date}")]
        public IActionResult GetIloscMetrowBoksDzien(DateTime date)
        {
            try
            {
                SumBoks sumaKlod = new SumBoks();
                List<Kloda> lista = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == date).ToList();
                foreach(var x in lista)
                {
                    switch(x.boks_nr)
                    {
                        case 1:
                            sumaKlod.boks1 += x.objetosc_m3;
                            break;
                        case 2:
                            sumaKlod.boks2 += x.objetosc_m3;
                            break;
                        case 3:
                            sumaKlod.boks3 += x.objetosc_m3;
                            break;
                        case 4:
                            sumaKlod.boks4 += x.objetosc_m3;
                            break;
                        case 5:
                            sumaKlod.trak += x.objetosc_m3;
                            break;
                        default:
                            break;
                    }
                }
                SumMetersBoks sm = new SumMetersBoks();
                sm.boks1 = (double)sumaKlod.boks1 / 10000;
                sm.boks2 = (double)sumaKlod.boks2 / 10000;
                sm.boks3 = (double)sumaKlod.boks3 / 10000;
                sm.boks4 = (double)sumaKlod.boks4 / 10000;
                sm.trak = (double)sumaKlod.trak / 10000;

                return Ok(sm);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("sibd/{date}")]
        public IActionResult GetIloscKlodWBoksachDzien(DateTime date)
        {
            try
            {
                SumBoks sumaKlod = new SumBoks();
                List<Kloda> lista = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == date).ToList();
                foreach(var x in lista)
                {
                    switch(x.boks_nr)
                    {
                        case 1:
                            sumaKlod.boks1++;
                            break;
                        case 2:
                            sumaKlod.boks2++;
                            break;
                        case 3:
                            sumaKlod.boks3++;
                            break;
                        case 4:
                            sumaKlod.boks4++;
                            break;
                        case 5:
                            sumaKlod.trak++;
                            break;
                        default:
                            break;
                    }
                }
                return Ok(sumaKlod);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("historydates/{dateFrom}/{dateTo}")]
        public IActionResult GetHistoriaDate(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                List<Kloda> listaKlod = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date >= dateFrom && i.czas_pomiaru <= dateTo.AddDays(1)).ToList();
                List<HistoryDate> history = new List<HistoryDate>();
                bool zero = true;

                foreach(var x in listaKlod)
                {
                    if(zero)
                    {
                        HistoryDate h = new HistoryDate();
                        h.Data = x.czas_pomiaru.Date;
                        h.sumaM3 = (double)x.objetosc_m3 / 10000;
                        h.sumaKlod = 1;
                        if(x.boks_nr == 5)
                        {
                            h.sumaKlodTrak = 1;
                            h.sumaM3Trak = (double)x.objetosc_m3 / 10000;
                        }
                        history.Add(h);
                        zero = false;
                    }
                    else
                    {
                        if(history.FindLast(f => f.Data == x.czas_pomiaru.Date) == null)
                        {
                            HistoryDate h = new HistoryDate();
                            h.Data = x.czas_pomiaru.Date;
                            h.sumaM3 = (double)x.objetosc_m3 / 10000;
                            h.sumaKlod = 1;
                            if(x.boks_nr == 5)
                            {
                                h.sumaKlodTrak = 1;
                                h.sumaM3Trak = (double)x.objetosc_m3 / 10000;
                            }
                            history.Add(h);

                        }
                        else
                        {
                            var o = history.FindIndex(f => f.Data == x.czas_pomiaru.Date);
                            history[o].sumaKlod += 1;
                            history[o].sumaM3 += (double)x.objetosc_m3 / 10000;
                            if(x.boks_nr == 5)
                            {
                                history[o].sumaKlodTrak += 1;
                                history[o].sumaM3Trak += (double)x.objetosc_m3 / 10000;
                            }

                        }
                    }
                }
                
                return Ok(history);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("chartData/{date}")]
        public IActionResult GetChartData(DateTime date)
        {
            try
            {
                List<Kloda> listaKlod = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date == date.Date).ToList();
                List<ChartData> chartData = new List<ChartData>();
                bool zero = true;
                List<double> suma = new List<double>();
                List<int> godz = new List<int>();

                DataChart datas = new DataChart();

                foreach(var x in listaKlod)
                {
                    if(zero)
                    {
                        if(x.boks_nr == 5)
                        {
                            ChartData h = new ChartData();
                            h.hour = x.czas_pomiaru.Hour;
                            h.suma = (double)x.objetosc_m3 / 10000;
                            chartData.Add(h);
                            zero = false;
                        }
                        
                    }
                    else
                    {
                        if(chartData.FindLast(f => f.hour == x.czas_pomiaru.Hour) == null)
                        {
                            if(x.boks_nr == 5)
                            {
                                ChartData h = new ChartData();
                                h.hour = x.czas_pomiaru.Hour;
                                h.suma = (double)x.objetosc_m3 / 10000;
                                chartData.Add(h);
                            }
                        }
                        else
                        {                            
                            if(x.boks_nr == 5)
                            {
                                var o = chartData.FindIndex(f => f.hour == x.czas_pomiaru.Hour);
                                chartData[o].suma += (double)x.objetosc_m3 / 10000;
                            }
                        }
                    }
                }
                foreach(var x in chartData)
                {
                    double d = x.suma;
                    int i = x.hour;
                    suma.Add(d);
                    godz.Add(i);
                }
                datas.godz = godz;
                datas.data = suma;
                return Ok(datas);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("historyperday/{dateFrom}/{dateTo}")]
        public IActionResult GetHistoryPerDay(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                DateTime xDateFrom = Convert.ToDateTime(dateFrom.ToShortDateString());
                DateTime xDateTo = Convert.ToDateTime(dateTo.ToShortDateString());
                List<Kloda> listaKlod = _context.WGA_KLODA.Where(i => i.czas_pomiaru.Date >= xDateFrom && i.czas_pomiaru <= xDateTo.AddDays(1)).ToList();
                List<HistoryPerDay> history = new List<HistoryPerDay>();
                bool zero = true;

                foreach(var x in listaKlod)
                {
                    if(zero)
                    {
                        HistoryPerDay h = new HistoryPerDay();
                        h.Data = x.czas_pomiaru.Date.ToShortDateString();
                        switch (x.boks_nr)
                        {
                            case 1: 
                                h.Boks1M3 = (double)x.objetosc_m3 / 10000;
                                h.Boks1Quantitty = 1;
                                break;
                            case 2:
                                h.Boks2M3 = (double)x.objetosc_m3 / 10000;
                                h.Boks2Quantitty = 1;
                                break;
                            case 3:
                                h.Boks3M3 = (double)x.objetosc_m3 / 10000;
                                h.Boks3Quantitty = 1;
                                break;
                            case 4:
                                h.Boks4M3 = (double)x.objetosc_m3 / 10000;
                                h.Boks4Quantitty = 1;
                                break;
                            case 5:
                                h.TrakM3 = (double)x.objetosc_m3 / 10000;
                                h.TrackQuantitty = 1;
                                break;
                            default: break;
                        }
                        h.SumM3 = (double)x.objetosc_m3 / 10000;
                        h.SumQuantitty = 1;
                        history.Add(h);
                        zero = false;
                    }
                    else
                    {
                        if(history.FindLast(f => f.Data == x.czas_pomiaru.Date.ToShortDateString()) == null)
                        {
                            HistoryPerDay h = new HistoryPerDay();
                            h.Data = x.czas_pomiaru.Date.ToShortDateString();
                            switch (x.boks_nr)
                            {
                                case 1: 
                                    h.Boks1M3 = (double)x.objetosc_m3 / 10000;
                                    h.Boks1Quantitty = 1;
                                    break;
                                case 2:
                                    h.Boks2M3 = (double)x.objetosc_m3 / 10000;
                                    h.Boks2Quantitty = 1;
                                    break;
                                case 3:
                                    h.Boks3M3 = (double)x.objetosc_m3 / 10000;
                                    h.Boks3Quantitty = 1;
                                    break;
                                case 4:
                                    h.Boks4M3 = (double)x.objetosc_m3 / 10000;
                                    h.Boks4Quantitty = 1;
                                    break;
                                case 5:
                                    h.TrakM3 = (double)x.objetosc_m3 / 10000;
                                    h.TrackQuantitty = 1;
                                    break;
                                default: break;
                            }
                            h.SumM3 = (double)x.objetosc_m3 / 10000;
                            h.SumQuantitty = 1;
                            history.Add(h);
                        }
                        else
                        {
                            var o = history.FindIndex(f => f.Data == x.czas_pomiaru.Date.ToShortDateString());
                            switch (x.boks_nr)
                            {
                                case 1: 
                                    history[o].Boks1M3 += (double)x.objetosc_m3 / 10000;
                                    history[o].Boks1Quantitty += 1;
                                    break;
                                case 2:
                                    history[o].Boks2M3 += (double)x.objetosc_m3 / 10000;
                                    history[o].Boks2Quantitty += 1;
                                    break;
                                case 3:
                                    history[o].Boks3M3 += (double)x.objetosc_m3 / 10000;
                                    history[o].Boks3Quantitty += 1;
                                    break;
                                case 4:
                                    history[o].Boks4M3 += (double)x.objetosc_m3 / 10000;
                                    history[o].Boks4Quantitty += 1;
                                    break;
                                case 5:
                                    history[o].TrakM3 += (double)x.objetosc_m3 / 10000;
                                    history[o].TrackQuantitty += 1;
                                    break;
                                default: break;
                            }
                            history[o].SumM3 += (double)x.objetosc_m3 / 10000;
                            history[o].SumQuantitty += 1;
                        }
                    }
                }
                
                return Ok(history);
            }
            catch
            {
                return NoContent();
            }
        }
    }
}
