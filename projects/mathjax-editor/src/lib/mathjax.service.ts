import { Injectable } from '@angular/core';

interface MathJaxLike {
  startup?: { promise?: Promise<unknown> };
  typeset?: (elements?: unknown) => unknown;
  typesetPromise?: (elements?: unknown) => Promise<unknown>;
}

@Injectable({ providedIn: 'root' })
export class MathJaxService {
  private loaderPromise?: Promise<MathJaxLike>;

  async typeset(element: HTMLElement): Promise<void> {
    const mathjax = await this.load();
    await this.invokeTypeset(mathjax, element);
  }

  private load(): Promise<MathJaxLike> {
    if (!this.loaderPromise) {
      this.loaderPromise = new Promise<MathJaxLike>((resolve, reject) => {
        const waitForMathJax = () => {
          const mathjax = (window as any).MathJax as MathJaxLike | undefined;
          if (!mathjax) {
            setTimeout(waitForMathJax, 25);
            return;
          }

          const finish = () => {
            this.configureAccessibility(mathjax);
            resolve(mathjax);
          };

          const startupPromise = mathjax.startup?.promise as Promise<unknown> | undefined;
          if (startupPromise) {
            startupPromise.then(finish).catch(reject);
            return;
          }

          if (typeof mathjax.typesetPromise === 'function' || typeof mathjax.typeset === 'function') {
            finish();
            return;
          }

          setTimeout(waitForMathJax, 25);
        };

        waitForMathJax();
      });
    }

    return this.loaderPromise;
  }

  private async invokeTypeset(mathjax: MathJaxLike, element: HTMLElement): Promise<void> {
    const anyMathJax = mathjax as any;

    if (typeof anyMathJax?.typesetClear === 'function') {
      anyMathJax.typesetClear([element]);
    }

    if (typeof anyMathJax?.texReset === 'function') {
      anyMathJax.texReset();
    }

    if (typeof mathjax.typesetPromise === 'function') {
      await mathjax.typesetPromise([element]);
      return;
    }

    if (typeof mathjax.typeset === 'function') {
      const result = mathjax.typeset([element]);
      if (result && typeof (result as Promise<unknown>).then === 'function') {
        await result as Promise<unknown>;
      }
      return;
    }

    throw new Error('Loaded MathJax instance does not expose a typeset API.');
  }

  private configureAccessibility(mathjax: MathJaxLike): void {
    const anyMathJax = mathjax as any;

    const configOptions = anyMathJax?.config?.options;
    if (configOptions && Object.prototype.hasOwnProperty.call(configOptions, 'enableAssistiveMml')) {
      configOptions.enableAssistiveMml = false;
    }

    const documentOptions = anyMathJax?.document?.options;
    if (documentOptions && Object.prototype.hasOwnProperty.call(documentOptions, 'enableAssistiveMml')) {
      documentOptions.enableAssistiveMml = false;
    }

    if (!anyMathJax?.config) {
      return;
    }

    anyMathJax.config.a11y = anyMathJax.config.a11y || {};
    if (anyMathJax.config.a11y.sre) {
      anyMathJax.config.a11y.sre.speech = false;
    }
  }
}
