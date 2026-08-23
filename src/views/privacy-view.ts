import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../components/organisms/site-header';
import { getPrimaryNavigation } from '../content/navigation';
import styles from './privacy-view.module.css';

@customElement('privacy-view')
export class PrivacyView extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <main class=${styles.privacyView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        <article class=${styles.policy} aria-labelledby="privacy-title">
          <header class=${styles.intro}>
            <p>LEGAL / ZIRON</p>
            <h1 id="privacy-title">🔐 Polityka prywatności – ZIRON</h1>
          </header>

          <section>
            <h2>1. Informacje ogólne</h2>
            <p>
              Administratorem danych osobowych jest <strong>ZIRON</strong> – firma świadcząca
              usługi mobilnego mycia maszyn, pojazdów i sprzętu.
            </p>
            <p>
              Kontakt z administratorem danych możliwy jest za pośrednictwem formularza
              kontaktowego lub numeru telefonu podanego w reklamach.
            </p>
          </section>

          <section>
            <h2>2. Zakres zbieranych danych</h2>
            <p>Za pośrednictwem formularzy reklamowych Meta (Facebook / Instagram) zbierane mogą być następujące dane:</p>
            <ul>
              <li>imię i nazwisko,</li>
              <li>numer telefonu,</li>
              <li>adres e-mail,</li>
              <li>inne informacje dobrowolnie podane w treści zgłoszenia.</li>
            </ul>
          </section>

          <section>
            <h2>3. Cel przetwarzania danych</h2>
            <p>Dane osobowe przetwarzane są wyłącznie w celu:</p>
            <ul>
              <li>kontaktu z osobą, która wysłała formularz,</li>
              <li>przygotowania oferty i realizacji usług,</li>
              <li>odpowiedzi na zapytanie.</li>
            </ul>
          </section>

          <section>
            <h2>4. Podstawa prawna przetwarzania</h2>
            <p>Dane przetwarzane są na podstawie:</p>
            <ul>
              <li>art. 6 ust. 1 lit. a RODO – zgoda użytkownika,</li>
              <li>art. 6 ust. 1 lit. b RODO – działania zmierzające do zawarcia umowy.</li>
            </ul>
          </section>

          <section>
            <h2>5. Udostępnianie danych</h2>
            <p>
              Dane osobowe <strong>nie są przekazywane osobom trzecim</strong>, z wyjątkiem
              podmiotów wspierających obsługę reklam (Meta Platforms Inc.) – wyłącznie w
              zakresie wymaganym do działania formularzy.
            </p>
          </section>

          <section>
            <h2>6. Okres przechowywania danych</h2>
            <p>
              Dane przechowywane są przez okres niezbędny do realizacji kontaktu i oferty,
              a następnie mogą zostać usunięte lub zanonimizowane.
            </p>
          </section>

          <section>
            <h2>7. Prawa użytkownika</h2>
            <p>Każda osoba, której dane dotyczą, ma prawo do:</p>
            <ul>
              <li>dostępu do swoich danych,</li>
              <li>ich poprawiania,</li>
              <li>usunięcia,</li>
              <li>ograniczenia przetwarzania,</li>
              <li>cofnięcia zgody w dowolnym momencie.</li>
            </ul>
          </section>

          <section>
            <h2>8. Pliki cookies</h2>
            <p>
              Strona może używać plików cookies w celach technicznych i statystycznych,
              zgodnie z zasadami platform Meta.
            </p>
          </section>

          <section>
            <h2>9. Zmiany w polityce prywatności</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej
              polityce prywatności.
            </p>
          </section>

          <section>
            <h2>10. Kontakt</h2>
            <p>
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt za
              pośrednictwem formularza lub telefonu.
            </p>
          </section>
        </article>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'privacy-view': PrivacyView;
  }
}
