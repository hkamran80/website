<script>
import {Sun,Moon}from "@lucide/svelte"

  const rootEl = typeof document !== 'undefined' ? document.documentElement : null;
  const themes = ['light', 'dark'];
  let theme = ''

  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  }

  function handleChange(event) {
    theme = event.target.value;
    localStorage.setItem('theme', theme);
  }

  $: if (rootEl && theme === 'light') {
    rootEl.classList.remove('dark');
  } else if (rootEl && theme === 'dark') {
    rootEl.classList.add('dark');
  }

  const icons = [
    Sun,
    Moon
  ];
</script>

<div class="theme-toggle">
    {#each themes as t, i}
        {@const Icon = icons[i]}
        <label for={`theme-toggle-${t}`} class={theme === t ? 'checked' : ''}>
            <span class="sr-only">Use {t} theme</span>
            <Icon size="20"/>

            <input
                type="radio"
                name={`theme-toggle-${t}`}
                checked={theme === t}
                value={t}
                title={`Use ${t} theme`}
                aria-label={`Use ${t} theme`}
                on:change={handleChange}
              />
        </label>
    {/each}
</div>

<style>
.theme-toggle {
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding-top: 8px;
    gap: 0.6em;
    border-radius: 99em;
    background-color: var(--theme-code-inline-bg);
}

@media (width >= 48rem) {
    padding: 0.33em 0.67em;
    margin-left: 10px;
}

.theme-toggle > label:focus-within {
    outline: 2px solid transparent;
    box-shadow:
        0 0 0 0.08em var(--theme-accent),
        0 0 0 0.12em white;
}

.theme-toggle > label {
    color: var(--theme-code-inline-text);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    cursor: pointer;
}

.theme-toggle .checked {
    color: var(--theme-accent);
    opacity: 1;
}

input[type="radio"] {
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}
</style>
