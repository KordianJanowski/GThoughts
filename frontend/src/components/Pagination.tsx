import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

interface Props {
  page: number;
  numberOfArticles: number;
  defaultRoute: string;
  fetchArticles: () => Promise<void>;
}

const Pagination: React.FC<Props> = ({page, numberOfArticles, fetchArticles, defaultRoute}) => {
  const history: any = useHistory();
  const maxPage = Math.ceil(numberOfArticles!/2)

  useEffect(() => {
    if(page && numberOfArticles) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      if(page < 1) {
        history.push(defaultRoute);
      }
      else if(page > maxPage) {
        history.push(`${defaultRoute}page/${maxPage}`);
      }
      else {
        if(page === 1) history.push(defaultRoute);
        fetchArticles()
      }
    }
    /* eslint-disable */
  }, [page, numberOfArticles])

  const linksMap = () => {
    var links = []
    for(let i = page; i <= page+2; i++){
      if(i <= maxPage) {
        links.push(
          <Link key={i} to={`${defaultRoute}page/${i}`} className={`pagination-btn ${page === i ? 'border border-white' : ''}`}>
            {i}
          </Link>
        );
      }
      else if(page-(i-maxPage) > 0) {
        links.unshift(
          <Link key={i} to={`${defaultRoute}page/${page-(i-maxPage)}`} className={`pagination-btn`}>
            {page-(i-maxPage)}
          </Link>
        );
      }
    }

    return links;
  }

  return (
    <>
    {
      maxPage > 1 ?
      <div className="flex items-center justify-center my-10">
        <Link to={page > 1  ? `${defaultRoute}page/${page-1}` : window.location.pathname} className="pagination-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </Link>

        { linksMap() }

        <Link to={page < maxPage  ? `${defaultRoute}page/${page+1}` : window.location.pathname} className="pagination-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      : null
    }
    </>
  )
}

export default Pagination