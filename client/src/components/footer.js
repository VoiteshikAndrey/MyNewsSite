import React from 'react'
import '../public/css/footer.css';
<script src="https://kit.fontawesome.com/3b37cbce19.js" crossorigin="anonymous"></script>
export const Footer = () => (
    
    <div className="footer">
        <div className="container">
            <div className="footer-content">
                    <div className="footer-logo">
                        <img src="http://localhost:3000/images/logo.png" alt="logo"></img>
                    </div>

                    <div className="footer-block">
                        <div className="title">FOLLOW US</div>
                        <div className="content">
                            <a href="https://www.instagram.com/voit_andrey/" target="_blank" className="link">
                                <i class="fab fa-instagram"></i>
                                <div className="network-name">Instagram</div>
                            </a>
                            <a href="https://www.youtube.com/channel/UC0rAtzOgfmJ7Slteo3rr6qQ" target="_blank" className="link">
                                <i class="fab fa-youtube"></i>
                                <div className="network-name">Youtube</div>
                            </a>
                            <a href="https://twitter.com/vojtesik" target="_blank" className="link">
                                <i class="fab fa-twitter"></i>
                                <div className="network-name">Twitter</div>
                            </a>
                            <a href="https://vk.com/paandres" target="_blank" className="link">
                                <i class="fab fa-vk"></i>
                                <div className="network-name">Vkontakte</div>
                            </a>
                        </div>
                    </div>

                    <div className="footer-block">
                        <div className="title">COMMUNITY</div>
                        <div className="content">
                            <a href="https://vk.com/paandres" className="link">Support</a>
                            <a href="https://vk.com/paandres" className="link">Help</a>
                        </div>
                    </div>

                    <div className="footer-block">
                        <div className="title">CONTACTS</div>
                        <div className="content">
                            <a href="tel:+375298296235" className="link">+375(29) 829 62 35</a>
                            <a href="mailto:andreyvoiteshik@mail.ru" className="link">andreyvoiteshik@mail.ru</a>
                        </div>
                    </div>

                    
            </div>

            <div className="copyright">
                <span>© 2021 NEWSRTU. Andrey Voiteshik</span>
            </div>
        </div>
    </div>
)