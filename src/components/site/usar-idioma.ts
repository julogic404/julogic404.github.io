import { useCallback, useEffect, useState } from "react";
import type { Idioma } from "../../content/site";

const CHAVE = "julogic-lang";

/** Guarda o idioma escolhido e deteta o idioma do dispositivo na 1ª visita. */
export function usarIdioma() {
  const [idioma, definirIdioma] = useState<Idioma>("pt");

  useEffect(() => {
    const idiomaSalvo = window.localStorage.getItem(CHAVE);
    if (idiomaSalvo === "pt" || idiomaSalvo === "en") {
      definirIdioma(idiomaSalvo);
      return;
    }
    const idiomaDispositivo = (navigator.languages?.[0] ?? navigator.language ?? "pt").toLowerCase();
    definirIdioma(idiomaDispositivo.startsWith("pt") ? "pt" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  const escolherIdioma = useCallback((proximo: Idioma) => {
    definirIdioma(proximo);
    window.localStorage.setItem(CHAVE, proximo);
  }, []);

  return { idioma, escolherIdioma };
}
