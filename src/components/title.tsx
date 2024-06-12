import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import i18next from "i18next";


const Title = ({prefix = '', suffix = ''}) => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname) {
      return
    }
    const paths = location.pathname.split('/').filter(Boolean);
    while (paths.length > 0) {
      const key = 'page.' + paths.join('.')
      if (i18next.exists(key)) {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const title: string | { index: string | null } = i18next.t(key, {returnObjects: true});
          if (typeof title === 'string') {
            document.title = prefix + title + suffix
          } else if (typeof title.index === 'string') {
            document.title = prefix + title.index + suffix
          }
        } catch (e) {
          console.error(e)
        }
        break;
      }
      paths.pop();
    }
  }, [location.pathname]);

  return null;
};

export default Title;
