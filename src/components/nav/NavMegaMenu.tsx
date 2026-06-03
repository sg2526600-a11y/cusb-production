import { useNavigation } from '@/hooks/useNavigation';
import type { NavMegaMenu as NavMegaMenuType, PageId } from '@/types';
import styles from './NavMegaMenu.module.css';

interface Props {
  item: NavMegaMenuType;
  isActive: boolean;
}

export default function NavMegaMenu({ item, isActive }: Props) {
  const { navigateTo } = useNavigation();

  return (
    <>
      <button
        className={isActive ? styles.active : ''}
        onClick={() => item.pageId && navigateTo(item.pageId as PageId)}
        aria-haspopup="true"
      >
        <div className="nl-btn-wrap">
          {item.labelHi && <span className="bi-hi">{item.labelHi}</span>}
          <span className="bi-en">{item.label}</span>
        </div>
      </button>

      <div className={styles.mega} role="menu">
        <div className={`${styles.grid} ${styles[`grid${item.columns.length}`]}`}>
          {item.columns.map((col) => (
            <div key={col.heading} className={styles.col}>
              <h6>{col.heading}</h6>
              <ul>
                {col.items.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" role="menuitem">
                        {link.label}
                      </a>
                    ) : (
                      <button
                        role="menuitem"
                        onClick={() => link.pageId && navigateTo(link.pageId as PageId)}
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {item.footer && item.footer.length > 0 && (
          <div className={styles.footer}>
            {item.footer.map((fl) => (
              fl.external ? (
                <a key={fl.label} href={fl.href} target="_blank" rel="noopener noreferrer">
                  {fl.label}
                </a>
              ) : (
                <button key={fl.label} onClick={() => fl.pageId && navigateTo(fl.pageId as PageId)}>
                  {fl.label}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    </>
  );
}
