export function renderNavbar() {
    // Resolve relative path for subpages
    const currentURL = window.location.href.includes('/pages/');
    const root = currentURL ? '../' : '';
    const baseLink = currentURL ? '../index.html' : '';

    return `
    <header>
        <div class="nav-container">
            <button class="logo" onclick="window.location.href='${baseLink}#'">Manuel Dev</button>
            <button class="mobile-menu-btn" aria-label="Abrir menú">
                <img src="${root}img/icon/dark/bars.svg" alt="Abrir menú" class="hamburger-icon open-icon">
                <img src="${root}img/icon/dark/times.svg" alt="Cerrar menú" class="hamburger-icon close-icon" style="display: none;">
            </button>
            <nav class="main-nav">
                <ul>
                    <li><a href="${baseLink}#home">Inicio</a></li>
                    <li><a href="${baseLink}#about-me">Sobre Mí</a></li>
                    <li><a href="${baseLink}#skills">Habilidades</a></li>
                    <li><a href="${baseLink}#education">Educación</a></li>
                    <li><a href="${baseLink}#projects">Proyectos</a></li>
                    <li class="theme-li">
                        <button id="theme-toggle" class="theme-btn" aria-label="Cambiar tema">
                            <img src="${root}img/icon/dark/sun.svg" alt="Cambiar tema" class="theme-icon-img" id="theme-icon-img">
                        </button>
                    </li>
                </ul>
            </nav>
            <a href="${baseLink}#contact" class="btn-primary desktop-only">Contactar</a>
        </div>
    </header>
    `;
}
