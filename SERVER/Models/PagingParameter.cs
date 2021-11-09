namespace DEMO_1.Models  
{  
    public class PagingParameter  
    {  
        const int maxPageSize = 200;  
  
        public int pageNumber { get; set; } = 1;  
  
        public int _pageSize { get; set; } = 5;  
  
        public int pageSize  
        {  
  
            get { return _pageSize; }  
            set  
            {  
                _pageSize = (value > maxPageSize) ? maxPageSize : value;  
            }  
        }  
    }  
}