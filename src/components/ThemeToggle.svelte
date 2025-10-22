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
    <label class={theme === t ? 'checked' : ''}>
            <Icon size="20"/>
      <input
        type="radio"
        name="theme-toggle"
        checked={theme === t}
        value={t}
        title={`Use ${t} theme`}
        aria-label={`Use ${t} theme`}
        on:change={handleChange}
      />
    </label>
  {/each}
</div>
