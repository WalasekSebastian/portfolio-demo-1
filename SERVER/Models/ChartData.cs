using System;
using System.Collections.Generic;

namespace DEMO_1.Models
{
    public class ChartData
    {
        public int hour {get;set;}
        public double suma {get;set;}
    }

    public class DataChart
    {
        public List<int> godz = new List<int>();
        public List<double> data = new List<double>();
    }
}