import './style.css'

import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,        // animation duration in ms
    once: true,           // only animate once
    easing: 'ease-out-cubic',
  });
});

const tabs = document.querySelectorAll<HTMLButtonElement>(".tab-link");
const contents = document.querySelectorAll<HTMLElement>(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // reset active state
    tabs.forEach((t) => t.classList.remove("text-purpl-accent", "font-semibold", "dark:text-dark-accent"));
    contents.forEach((c) => c.classList.add("hidden"));

    // activate clicked tab
    tab.classList.add("text-purpl-accent", "font-semibold", "dark:text-dark-accent");
    const target = document.getElementById(tab.dataset.tab!);
    target?.classList.remove("hidden");
  });
});

const arrow = document.getElementById("scroll-arrow");
arrow?.addEventListener("click", () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
});

const filterBtns = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
const projects = document.querySelectorAll<HTMLElement>(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove highlight from all buttons
    filterBtns.forEach((b) => b.classList.remove("text-purpl-accent"));
    btn.classList.add("text-purpl-accent");

    const filter = btn.dataset.filter;

    projects.forEach((project) => {
      if (filter === "all" || project.dataset.category === filter) {
        project.classList.remove("hidden");
      } else {
        project.classList.add("hidden");
      }
    });
  });
});

const toggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement | null;

type Theme = "light" | "dark";

function setTheme(theme: Theme): void {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

const stored = localStorage.getItem("theme") as Theme | null;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme: Theme = stored ?? (prefersDark ? "dark" : "light");
setTheme(initialTheme);

toggleBtn?.addEventListener("click", () => {
  const newTheme: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  setTheme(newTheme);
});

const emailUser: string = "irina.susca";
const emailDomain: string = "gmail.com";
const email: string = `${emailUser}@${emailDomain}`;

const emailLink = document.getElementById("email-link") as HTMLAnchorElement | null;

if (emailLink) {
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
}