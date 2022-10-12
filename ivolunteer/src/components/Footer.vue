<template>
    <footer class="footer">
        <div class="footer__addr">
            <a class="footer_logo" href='/'>
                <img src="@/assets/footerlogo.png">
            </a>
            <h2>Volunteering from the Heart</h2>

        </div>
        
        <ul class="footer__nav">
            <li class="nav__item">
            <h2 class="nav__title">Company</h2>
            <ul class="nav__ul">
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Careers</a>
                </li>
                <li>
                    <a href="#">Blog</a>
                </li>
            </ul>
            </li>

            <li class="nav__item">
            <h2 class="nav__title">Features</h2>
            <ul class="nav__ul">
                <li>
                    <a href="#">Home</a>
                </li>

                <li>
                    <a href="#">Community</a>
                </li>
                    
                <li>
                <a href="#">Support</a>
                </li>
            </ul>
            </li>

            <li class="nav__item">
            <h2 class="nav__title">Contact Us</h2>
            <ul class="nav__ul">
                <li>
                    <a href="#">info@iVolunteer.com</a>
                </li>

                <li>
                    <a href="#">+65 6235 3535</a>
                </li>
                    
                <li>
                    <a href="#">1010 Sunset Blv</a>
                </li>
            </ul>
            </li>
            
            <li class="nav__item">
            <h2 class="nav__title">Legal</h2>
            
            <ul class="nav__ul">
                <li>
                    <a href="#">Privacy Policy</a>
                </li>
                
                <li>
                    <a href="#">Terms of Use</a>
                </li>
                
                <li>
                    <a href="#">Sitemap</a>
                </li>
            </ul>
            </li>
        </ul>
        
        <div class="legal">
            <p>&copy; Copyright 2022 iVolunteering. All rights reserved.</p>
        </div>
    </footer>

    
</template>

<style scoped>

    body {
        margin: 0;
        margin-bottom: 0px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        font-size: 14px;
        background-color: #FEF8F3;
        align-items: start;
        min-height: 100vh;
    }

    .footer {
        display: flex;
        flex-flow: row wrap;
        padding: 30px 30px 20px 30px;
        background-color: #FF734C;
        border-top: 1px solid #e5e5e5;
        height: 350px;
        width: 100%;
        text-align: left;
    }

    .footer > * {
        flex: 1 100%;
    }

    .footer__addr {
        margin-right: 7em;
        margin-bottom: 2em;
        margin-left: 10px;
    }

    .footer__addr h2 {
        margin-top: 1.3em;
        font-size: 15px;
        font-weight: 400;
        color: #FEF8F3;
    }

    .nav__title {
        font-weight: 100;
        font-size: 24px;
        color: #FEF8F3;
        margin-bottom: 28px;
    }

    .footer ul {
        list-style: none;
        padding-left: 0;
        font-weight: 100;
    }

    .footer li {
        line-height: 2em;
    }

    .footer__nav {
        display: flex;
        flex-flow: row wrap;
    }

    .nav__ul a {
        color: #FEF8F3;
    }

    a:hover {
        color: #f8d0ae;
    }

    .legal {
        display: flex;
        flex-wrap: wrap;
        color: #FEF8F3;
        font-size: 13px;
        margin-left: 10px;
        margin-top: 90px;
    }
    
    @media screen and (min-width: 24.375em) {
    .legal .legal__links {
        margin-left: auto;
    }
    }

    @media screen and (min-width: 40.375em) {
    .footer__nav > * {
        flex: 1;
    }
    
    .footer__addr {
        flex: 1 0px;
    }
    
    .footer__nav {
        flex: 2 0px;
    }
}

</style>