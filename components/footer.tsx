import { CMS_LOGO, CMS_TITLE } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="text-white bg-dark mt-5">
        <div className="container py-4 py-lg-5">
            <div className="row justify-content-center">
                <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
                    <h3 className="fs-6 text-white">PÁGINAS</h3>
                    <ul className="list-unstyled">
                        <li><a className="link-light" href="#">Sobre</a></li>
                        <li><a className="link-light" href="#">Contatos</a></li>
                        <li><a className="link-light" href="#">Anuncie!</a></li>
                        <li><a className="link-light" href="#">Política de Privacidade</a></li>
                    </ul>
                </div>
                <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
                    <h3 className="fs-6 text-white">MAPA DO SITE</h3>
                    <ul className="list-unstyled">
                        <li><a className="link-light" href="#">Últimas</a></li>
                        <li><a className="link-light" href="#">Política</a></li>
                        <li><a className="link-light" href="#">Polícia</a></li>
                        <li><a className="link-light" href="#">Geral</a></li>
                        <li><a className="link-light" href="#">Municípios</a></li>
                        <li><a className="link-light" href="#">Esportes</a></li>
                        <li><a className="link-light" href="#">Eventos</a></li>
                    </ul>
                </div>
                <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
                    <h3 className="fs-6 text-white">&nbsp;</h3>
                    <ul className="list-unstyled">
                        <li><a className="link-light" href="#">Piauí</a></li>
                        <li><a className="link-light" href="#">Economia</a></li>
                        <li><a className="link-light" href="#">Entretenimento</a></li>
                        <li><a className="link-light" href="#">Cultura</a></li>
                        <li><a className="link-light" href="#">Teresina</a></li>
                        <li><a className="link-light" href="#">Parnaíba</a></li>
                    </ul>
                </div>
                <div
                    className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last item social">
                    <div className="fw-bold d-flex align-items-center mb-3"><img src={`/assets/img/${CMS_LOGO}`} alt={CMS_TITLE} width="155" />
                    </div>
                    <p>É proibida a reprodução do conteúdo desta página em qualquer meio de comunicação, eletrônico ou
                        impresso, sem autorização escrita do Portal343.com.</p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center pt-3">
                <p className="mb-0">Copyright © 2024&nbsp;<a href="#">Portal343.com</a></p>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item"><a href="#">WhatsApp 86988830013</a></li>
                    <li className="list-inline-item"><a href="#">redacao@portal343.com</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}
