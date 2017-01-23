angular.module("App.controllers", [])
    .controller("HomeController", function($scope, $rootScope) {
        $scope.links = [{
                title: "Eventos",
                icon: "fa-calendar",
                text: "Gerenciador de Eventos",
                link: "/cadastro_evento"
            }, {
                title: "Cadastros",
                icon: "fa-pencil-square-o",
                text: "Gerenciador de Cadastros",
                link: "/cadastros"
            }

        ];

    })
    .controller("CadastrosController", function($scope, $rootScope) {
        $scope.links = [{
                title: "Tipos Eventos",
                icon: "fa-pencil-square-o",
                text: "Cadastrar novo tipo de Eventos",
                // link: "/tipo_evento"

                link: "/cadastros"
            }, {
                title: "SubTipos Eventos",
                icon: "fa-pencil-square-o",
                text: "Cadastrar subtipo de Eventos",
                // link: "/tipo_evento"

                link: "/cadastros"
            }, {
                title: "Cotas",
                icon: "fa-pencil-square-o",
                text: "% Cotas por tipo de Evento",
                // link: "/cotas_evento"
                link: "/cadastros"
            }, {
                title: "Clientes",
                icon: "fa-pencil-square-o",
                text: "Cadastrar clientes internos",
                // link: "/cotas_evento"
                link: "/cadastros"
            }

        ];

    })
    .controller("EventosController", function($scope, $rootScope, $filter) {
        $rootScope.tabactive = 0;
        $rootScope.viewEvento = false;
        $scope.collapseFormEvento = true;

        function novo() {
            $scope.evento = $rootScope.modeloEvento;
            $scope.evento.id = $rootScope.listaEventos.length;
            $scope.evento.data_cadastro = new Date();
        }

        $scope.novoEvento = function() {
            $scope.collapseFormEvento = false;
            novo();

        }
        $scope.salvarEvento = function() {
            $rootScope.listaEventos[$scope.evento.id] = $scope.evento;
        }

        $scope.getPercCota = function(id) {
            if ($scope.evento) {
                return parseInt($scope.evento.tipoEvento.percs[id]);
            }
        }
        $scope.visualizarEvento = function(evento) {
            $scope.evento = evento;
            $rootScope.viewEvento = true;
            $scope.collapseFormEvento = false;
        }
        $scope.getCotas = function(id) {
            if ($scope.evento) {
                return parseInt(($scope.evento.cotas / 100) * $scope.getPercCota(id));
            }
        }
        $scope.addConvidadoGrupoAlvo = function() {
            $scope.evento.grupos.push({ grupo: $rootScope.convidadoGrupoAlvo.grupo, clienteInterno: $rootScope.convidadoGrupoAlvo.clienteInterno });
            $rootScope.convidadoGrupoAlvo = {};
        }

        $scope.addConvidadoAvulso = function() {
            $scope.evento.convidados.push({ name: $rootScope.convidadoAvulso.nome, email: $rootScope.convidadoAvulso.email, telefone: $rootScope.convidadoAvulso.telefone, clienteInterno: $rootScope.convidadoAvulso.clienteInterno });
            $rootScope.convidadoAvulso = {};
        }

        $scope.closeTabs = function() {
            $scope.evento = null;
            $rootScope.viewEvento = false;
            $scope.collapseFormEvento = true;
        }

        $rootScope.totalQ = 0;
        $rootScope.totalP = 0;

        $scope.tipoCota = "s";

        $scope.selectCota = function(tipo) {
            /*$scope.tipoCota = tipo;


            this.calcCotas();


            if (tipo == "s") {

            } else if (tipo == "q") {} else if (tipo == "p") {

            }*/
        }

        $scope.teste1 = function() {
            console.log('teste(0) ');
            this.calcCotas();
        }
        $scope.calcCotas = function() {

            var list = $rootScope.listaCalcTipos;


            //$rootScope.totalQ = 0;
            //$rootScope.totalP = 0;

            for (var i = 0; i < list.length; i++) {
                list[i].values[0] = this.getCotas(i);
                $rootScope.totalQ += list[i].values[0];


                list[i].values[1] = this.getPercCota(i);
                $rootScope.totalP += list[i].values[1];
            }
        }




    })
    .controller("MainController", function($scope, $rootScope, $filter, $uibModal, $document, $location) {


        $rootScope.dataValidade = function(date) {
            if (date) {
                var newDate = new Date(new Date(date).setMonth(date.getMonth() + 6));
                return $filter('date')(newDate, "dd/MM/yyyy");;
            }
        }

        $rootScope.newDate = new Date();

        $rootScope.listaTemplates = [
            { name: 'Convite Show' },
            { name: 'Convite Jogo' }
        ];
        $rootScope.listaCanaisEnvio = [
            { name: 'Email' },
            { name: 'SMS' },
            { name: 'Mais Efetivo por Cliente' }
        ];
        $rootScope.listaCanaisRSVP = [
            { name: 'Call List' },
            { name: 'Email' },
            { name: 'SMS' }
        ];

        $rootScope.listaClientesInternos = [
            { name: 'Mapfre' },
            { name: 'Presidencia SH1' },
            { name: 'Presidencia SH2' },
            { name: 'BB Seguridade' }
            // { name: 'Victor Serra', email:'victor.serra@partners.srv.br', telefone: '11 98901 9919', clienteInterno:  },
        ];

        $rootScope.listaCalcTipos = [
            { name: 'Rede Mapfre', values: [] },
            { name: 'Rede BB', values: [] },
            { name: 'Presidencia SH1', values: [] },
            { name: 'Presidencia SH2', values: [] },
            { name: 'MSF', values: [] },
            { name: 'BB Seguridade', values: [] },
            { name: 'Agência', values: [] },
            { name: 'Reserva Técnica', values: [] },
            { name: 'Grupo(RH)', values: [] }
        ];

        $rootScope.listaTipos = [{
                name: 'CINEMA',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'ESTRÉIAS' },
                    { name: 'INGRESSOS' }
                ]
            }, {
                name: 'TEATRO',
                percs: [40, 20, 10, 11, 5, 5, 5, 2, 2],
                subs: [

                    { name: 'PEÇAS' },
                    { name: 'STAND UP' },
                    { name: 'MÁGICA' },
                    { name: 'MUSICAL' }
                ]
            }, {
                name: 'DANÇA',
                percs: [15, 15, 15, 15, 15, 15, 5, 3, 2],
                subs: [
                    { name: 'BALLET' },
                    { name: 'CONTEMPORÂNEA' }

                ]
            }, {
                name: 'MUSICA',
                percs: [10, 10, 10, 30, 10, 10, 5, 5, 10],
                subs: [
                    { name: 'SHOWS' },
                    { name: 'CONCERTOS' },
                    { name: 'ÓPERAS' },
                    { name: 'FESTIVAIS' }

                ]
            }, {
                name: 'EXPOSIÇÕES',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'ARTES VISUAIS' },
                    { name: 'LITERATURA' }

                ]
            }, {
                name: 'ESPECIAIS',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'CARNAVAL' },
                    { name: 'CIRCO' },
                    { name: 'PALESTRAS' }

                ]
            }, {
                name: 'GASTRONOMIA',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'RESTAURANTE' },
                    { name: 'FESTIVAIS' }

                ]
            }, {
                name: 'EDUCATIVOS',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'PROGRAMAS' }

                ]
            }, {
                name: 'MODA',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'FASHION WEEK' }

                ]
            }, {
                name: 'ESPORTE',
                percs: [30, 30, 5, 5, 10, 10, 2, 2, 6],
                subs: [
                    { name: 'FUTEBOL' },
                    { name: 'TENIS' },
                    { name: 'BASQUETE' },
                    { name: 'OLIMPIADAS' }

                ]
            }

        ];
        $rootScope.listaProgramas = [
            { name: 'Budget Q1 - Shows' },
            { name: 'Budget Q2 - Cliente Silver' },
            { name: 'Budget Q2 - Cliente Gold' },
            { name: 'Budget Q3' }

        ];
        $rootScope.listaGrupos = [
            { name: 'GA-SP Gold', desc: "Grupo Alvo São Paulo Gold" },
            { name: 'GA-SP Silver', desc: "Grupo Alvo São Paulo Silver" },
            { name: 'GA-SP Bronze', desc: "Grupo Alvo São Paulo Bronze" }

        ];

        $rootScope.convidadoGrupoAlvo = {

        }

        $rootScope.convidadoAvulso = {

        }

        $rootScope.modeloEvento = {
            nome: '',
            tipoEvento: $rootScope.listaTipos[0],
            programa: $rootScope.listaProgramas[0],
            local: '',
            dataInicio: new Date('02/20/2017'),
            horaInicio: '08:00',
            dataFim: new Date('02/20/2017'),
            horaFim: '22:00',
            descricao: '',
            templateYMkt: 0,
            cotas: 200,
            arquivoBanner: '',
            arquivoPagina: '',
            arquivoTeaser: '',
            arquivoLogomarca: '',
            arquivoRodape: '',
            arquivoClassificacao: '',
            canalEnvio: 0,
            canalRSVP: 0,
            passWallet: 0,

            grupos: [],

            convidados: []
        }

        $rootScope.listaEventos = [
            { "nome": "BANDA MANTIQUEIRA", "tipoEvento": { "name": "Concertos", "percs": [30, 30, 5, 5, 10, 10, 2, 2, 6] }, "programa": { "name": "Budget Q1 - Shows" }, "local": "Sesc Jundiaí", "dataInicio": "2017-02-20T03:00:00.000Z", "horaInicio": "20:00", "dataFim": "2017-02-20T03:00:00.000Z", "horaFim": "22:00", "descricao": "", "templateYMkt": 0, "cotas": "100", "arquivoBanner": "", "arquivoPagina": "", "arquivoTeaser": "", "arquivoLogomarca": "", "arquivoRodape": "", "arquivoClassificacao": "", "canalEnvio": 0, "canalRSVP": 0, "passWallet": 0, "grupos": [{ "grupo": { "name": "GA-SP Gold", "desc": "Grupo Alvo São Paulo Gold" } }], "convidados": [], "id": 0, "data_cadastro": "2017-01-20T12:28:50.862Z" },
            { "nome": "MARIA GADÚ", "tipoEvento": { "name": "Concertos", "percs": [30, 30, 5, 5, 10, 10, 2, 2, 6] }, "programa": { "name": "Budget Q1 - Shows" }, "local": "CARAGUATATUBA, SP", "dataInicio": "2017-02-22T03:00:00.000Z", "horaInicio": "16:00", "dataFim": "2017-02-22T03:00:00.000Z", "horaFim": "22:00", "descricao": "", "templateYMkt": 0, "cotas": "400", "arquivoBanner": "", "arquivoPagina": "", "arquivoTeaser": "", "arquivoLogomarca": "", "arquivoRodape": "", "arquivoClassificacao": "", "canalEnvio": 0, "canalRSVP": 0, "passWallet": 0, "grupos": [{ "grupo": { "name": "GA-SP Gold", "desc": "Grupo Alvo São Paulo Gold" } }, { "grupo": { "name": "GA-SP Silver", "desc": "Grupo Alvo São Paulo Silver" } }, { "grupo": { "name": "GA-SP Bronze", "desc": "Grupo Alvo São Paulo Bronze" } }], "convidados": [{ "name": "cliente1" }], "id": 1, "data_cadastro": "2017-01-20T12:31:22.515Z" },
            { "nome": "JOÃO BOSCO E VINÍCIUS", "tipoEvento": { "name": "Concertos", "percs": [30, 30, 5, 5, 10, 10, 2, 2, 6] }, "programa": { "name": "Budget Q2 - Cliente Gold" }, "local": "CARAGUATATUBA, SP", "dataInicio": "2017-03-07T03:00:00.000Z", "horaInicio": "20:00", "dataFim": "2017-03-07T03:00:00.000Z", "horaFim": "22:00", "descricao": "", "templateYMkt": 0, "cotas": "50", "arquivoBanner": "", "arquivoPagina": "", "arquivoTeaser": "", "arquivoLogomarca": "", "arquivoRodape": "", "arquivoClassificacao": "", "canalEnvio": 0, "canalRSVP": 0, "passWallet": 0, "grupos": [{}, { "grupo": { "name": "GA-SP Gold", "desc": "Grupo Alvo São Paulo Gold" } }, { "grupo": { "name": "GA-SP Silver", "desc": "Grupo Alvo São Paulo Silver" } }], "convidados": [{ "name": "cliente" }, { "name": "cliente" }], "id": 2, "data_cadastro": "2017-01-20T12:34:50.432Z" },
            { "nome": "São Paulo X Ponte Petra", "tipoEvento": { "name": "Jogos de Futebol", "percs": [10, 10, 10, 30, 10, 10, 5, 5, 10] }, "programa": { "name": "Budget Q3" }, "local": "Morumbi", "dataInicio": "2017-02-12T02:00:00.000Z", "horaInicio": "16:00", "dataFim": "2017-02-12T02:00:00.000Z", "horaFim": "22:00", "descricao": "", "templateYMkt": 0, "cotas": "10000", "arquivoBanner": "", "arquivoPagina": "", "arquivoTeaser": "", "arquivoLogomarca": "", "arquivoRodape": "", "arquivoClassificacao": "", "canalEnvio": 0, "canalRSVP": 0, "passWallet": 0, "grupos": [{ "grupo": { "name": "GA-SP Gold", "desc": "Grupo Alvo São Paulo Gold" } }, { "grupo": { "name": "GA-SP Silver", "desc": "Grupo Alvo São Paulo Silver" } }, { "grupo": { "name": "GA-SP Bronze", "desc": "Grupo Alvo São Paulo Bronze" } }], "convidados": [{ "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }, { "name": "cliente" }], "id": 3, "data_cadastro": "2017-01-20T12:37:20.001Z" }

        ];

        $rootScope.linksHome = [{
                title: "Dashboards de  Marketing",
                list: [{
                    title: "Dashboards BOC",
                    icon:'fa fa-th',
                    link: "https://epmprod88bd242fdb0.us1.hana.ondemand.com/sap/fpa/ui/tenant/PRESALESBRAZIL",
                    target: '_blank'
                }, {
                    title: "Dashboard Executivo",
                    icon:'fa-th-large',
                    link: "https://coeportal218.saphosting.de/sap/ead/fnd/ui/index.html?sap-language=EN&sap-sbee-config=headerless&sap-sbee-nav=%2fdashboard%2f1&ICON=sap-icon%3a%2f%2fbbyd-dashboard",
                    target: '_blank'
                }]
            }, {
                title: "Insights",
                list: [{
                    title: "Dashboard de Contatos",
                    icon:'fa fa-th',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#CONTACTENGAGEMENT",
                    target: '_blank'
                }, {
                    title: "Análise de Sentimento",
                    icon:'fa-line-chart',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#SENTIMENTANALYTICS",
                    target: '_blank'
                }, {
                    title: "Análise de Jornada",
                    icon:'fa-pie-chart',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#CustomerJourney-viewCustomerJourney&/variant/id_1438961059809_54",
                    target: '_blank'
                }]
            }, {
                title: "Base de Marketing",
                list: [{
                    title: "Contatos",
                    icon:'fa-users',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#CONOWL",
                    target: '_blank'
                }, {
                    title: "Importação de Dados",
                    icon:'fa-upload',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#IMPORT_CSV",
                    target: '_blank'
                }, {
                    title: "Criação de Scores",
                    icon:'fa-line-chart',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#SimpleScores-create",
                    target: '_blank'
                }]
            }, {
                title: "Recomendações & Predições",
                list: [{
                    title: "Modelos de Recomendação",
                    icon:'fa-share-alt-square',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#PRODRECO",
                    target: '_blank'
                }, {
                    title: "Algorítimos de Recommendação",
                    icon:'fa-code',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Recommendation-algorithmDefaults&/Algorithms/ERP_SDITEM_CYCLIC_ITEMS",
                    target: '_blank'
                }, {
                    title: "Cenários de Recommendação",
                    icon:'fa-retweet',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Recommendation-maintainScenario&/Scenarios/ACCESSORIES",
                    target: '_blank'
                }, {
                    title: "Estratificação",
                    icon:'fa-external-link',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#STR",
                    target: '_blank'
                }, {
                    title: "Estudio Preditivo ",
                    icon:'fa-codiepie',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#PRED_MODELS",
                    target: '_blank'
                }]
            }, {
                title: "Segmentação de Clientes",
                list: [{
                    title: "Modelo de Segmentação",
                    icon:'fa-modx',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#SEGMENTATION",
                    target: '_blank'
                }, {
                    title: "Target Groups",
                    icon:'fa-bullseye',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#TARGETGROUPS",
                    target: '_blank'
                }]
            }, {
                title: "Campanhas & Ofertas",
                list: [{
                    title: "Canais de Comunicação",
                    icon:'fa-comments',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#SenderProfiles-maintain&/detail/CampaignSenderProfiles('MAIL')",
                    target: '_blank'
                }, {
                    title: "Estúdio de Templates",
                    icon:'fa-file-text',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#MarketingContent-showList&/sap-iapp-state=ASQ618R4DPUQ0Q4QW0IH8V3THSVIYANTZAR7LGHX",
                    target: '_blank'
                }, {
                    title: "Campanhas",
                    icon:'fa-compass',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/sap/cuan_shell/index.html?sap-hpa-fiori=true#INITIATIVES",
                    target: '_blank'
                }, {
                    title: "Calendário de Marketing",
                    icon:'fa-calendar',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Initiative-startMktCalendar&/sap-iapp-state=ASKBF4OP8K9JQL9LVPBZKEU13AVX9KW9TI3IGP9T"
                }, {
                    title: "Ofertas",
                    icon:'fa-gift',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Recommendation-startManageOffer",
                    target: '_blank'
                }]
            }, {
                title: "Eventos",
                list: [{
                    title: "Gerenciamento",
                    icon:'fa-calendar',
                    link: "#/cadastro_evento",
                    target: '_self'
                }, {
                    title: "Cadastros",
                    icon:'fa-pencil-square-o',
                    link: "#/cadastros",
                    target: '_self'
                }]
            }, {
                title: "Gastos",
                list: [{
                    title: "Programas",
                    icon:'fa-tasks',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#MarketingPlanner-managePrograms&/detail/Programs(guid'02000a1b-aa8f-1ed5-b78b-7aad19f42c6d')",
                    target: '_blank'
                }, {
                    title: "Adicionar Gastos de Marketing",
                    icon:'fa-money',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Initiative-spendQuickentry&/sap-iapp-state=ASQ611NVOC0M1F55Q5P00J7TPGNQ0RKB7OFDBBW5",
                    target: '_blank'
                }, {
                    title: "Detalhes de Gastos de Marketing",
                    icon:'fa-info-circle',
                    link: "https://ec2-52-67-23-140.sa-east-1.compute.amazonaws.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Initiative-spendMaintenance&/detail/Initiatives('0000010194')/sap-iapp-state=ASQ612MWJHUMDWK50SNH67ZNR6FP06MVVYBK1Z9U",
                    target: '_blank'
                }]
            }
        ]
    })



.controller("VoluntariosController", function($scope, $rootScope, $filter) {


        $rootScope.tabactive = 0;
        $rootScope.viewVoluntario = false;
        $scope.collapseFormValuntario = true;



        function novo() {
            $scope.voluntario = {};
            $scope.voluntario.data_cadastro = new Date();
            $scope.voluntario.ativo = true;
        }

        $scope.getRandomFoto = function() {
            var n = Math.floor(Math.random() * 4) + 1;
            return './view/images/r' + n + '.jpg';
        }


        $scope.links = [{
                title: "Cadastro",
                icon: "fa-plus-square",
                text: "Cadastro de Voluntarios",
                link: "/cadastro_voluntario"
            }
            /*, {
                        title: "Relatórios",
                        icon: "fa-search",
                        text: "Consultar Lista Voluntarios",
                        link: "/cotacoes"
                    }*/
        ];
        /*
                $rootScope.dataValidade = function(date) {
                    if (date) {
                        return date.getDate() + '/' + (date.getMonth() + 6) + '/' + date.getFullYear();
                    }
                }*/

        $scope.checkPesquisaUsada = function(id) {
            if ($scope.voluntario && $scope.voluntario.pesquisas) {
                return $filter('getById')($scope.voluntario.pesquisas, id);
            }
        }
        $scope.checkPesquisaVencida = function(id) {
            var pesquisa = $filter('getById')($scope.listaPesquisas, id);
            if (pesquisa) {
                //console.log(pesquisa.id + ">> " + pesquisa.validade + " | " + new Date() + " | " +( pesquisa.validade > new Date()) );
                return pesquisa.validade > new Date();
                // return $filter('getById')($scope.listaPesquisas, id).validade > new Date();
            }
        }

        $scope.addAnexo = function() {
            $scope.voluntario.anexos = [{ id: 1, nome: 'webcam', url: $scope.getRandomFoto(), tamanho: '1MB', data: new Date() }];
        }

        $scope.addPesquisa = function(idPesquisa) {

            if (!$scope.voluntario.pesquisas) {
                $scope.voluntario.pesquisas = [];
            }

            $scope.voluntario.pesquisas.push({ id: idPesquisa, pesquisa: $rootScope.listaPesquisas[idPesquisa] });
        }

        $scope.closeTabs = function() {
            $scope.voluntario = null;
            $rootScope.viewVoluntario = false;
            $scope.collapseFormValuntario = true;
        }

        $scope.novoVoluntario = function() {
            $scope.collapseFormValuntario = false;
            novo();

        }

        $scope.visualizarVoluntario = function(voluntario) {

            $scope.voluntario = voluntario;
            $rootScope.viewVoluntario = true;
            $scope.collapseFormValuntario = false;
        }

        $rootScope.onChangeCep = function() {

            if ($scope.voluntario.cep.length == 8) {

                var cep = $filter('getByCEP')($scope.listaCeps, $scope.voluntario.cep);

                if (cep != null) {
                    $scope.voluntario.rua = cep.rua;
                    $scope.voluntario.bairro = cep.bairro;
                    $scope.voluntario.cidade = cep.cidade;
                    $scope.voluntario.estado = cep.estado;
                }
            }
        }

        $scope.salvarVoluntario = function() {



            //if (formulario.$valid) {
            $scope.voluntario.id = $rootScope.voluntarios.length + 1;
            $scope.voluntario.sexo = $scope.voluntario.sexo.code;
            $scope.voluntario.perfil = $scope.voluntario.perfil.code;
            $scope.voluntario.cidade = $scope.voluntario.cidade.code;
            $scope.voluntario.estado = $scope.voluntario.estado.code;
            $rootScope.voluntarios.push($scope.voluntario);
            novo();
            $scope.addVoluntario = !$scope.addVoluntario;
            //}
        }

    })
    .controller("PesquisasController", function($scope, $rootScope) {
        $scope.links = [{
                title: "Cadastro",
                icon: "fa-plus-square",
                text: "Cadastro de Pesquisa",
                link: "/cadastro_pesquisa"
            }
            /*, {
                        title: "Relatórios",
                        icon: "fa-search",
                        text: "Consultar Lista Pesquisas",
                        link: "/cotacoes"

                    }*/
        ];

        novo();
        $rootScope.adicionandoPergunta = false;
        $rootScope.viewPesquisa = false;
        $scope.collapseFormPesquisa = true;




        $scope.visualizarPesquisa = function(pesquisa) {
            $scope.pesquisa = pesquisa;
            $rootScope.viewPesquisa = true;
            $scope.collapseFormPesquisa = false;
        }


        $scope.closeTabs = function() {
            $scope.pesquisa = null;
            $rootScope.viewPesquisa = false;
            $scope.collapseFormPesquisa = true;
        }




        function novo() {
            $scope.pesquisa = {};
            $scope.pesquisa.data_cadastro = new Date();
            $scope.pesquisa.ativo = true;

            $scope.pesquisa.perguntas = [];

            $scope.pergunta = {};
            $scope.pergunta.respostas = [];
        }

        $scope.novaPesquisa = function() {
            $scope.collapseFormPesquisa = false;
            novo();

        }

        $scope.addPergunta = function() {
            $scope.adicionandoPergunta = true;
            $scope.addResposta();
            $scope.addResposta();
        }

        $scope.addResposta = function() {
            $scope.pergunta.respostas.push({ id: $scope.pergunta.respostas.length, titulo: '' });
        }

        $scope.salvarPergunta = function() {
            $scope.pergunta.id = $scope.pesquisa.perguntas.length;
            $scope.pesquisa.perguntas.push($scope.pergunta);
            $scope.pergunta = {};
            $scope.pergunta.respostas = [];
            $scope.adicionandoPergunta = false;
        }

        $scope.salvarPesquisa = function() {
            $scope.pesquisa.id = $rootScope.listaPesquisas.length;
            $rootScope.listaPesquisas.push($scope.pesquisa);
            novo();
        }
    })
    .controller("RelatoriosController", function($scope, $rootScope, $filter) {

        $scope.busca = {};
        $scope.busca.sexo = {};
        $scope.busca.perfil = {};

        $scope.busca.cidade = {};
        $scope.busca.estado = {};

        $scope.busca.faixa_etaria = {};

        function init() {

        }



        $scope.exportHeader = function(tipo) {
            return ['Codigo', 'Nome', 'Telefone', 'Sexo', 'Nascimento', 'Perfil', 'Cidade', 'Ativo'];
        }

        $scope.exportArray = function(tipo) {
            var returnArray = [];
            for (var i = $rootScope.voluntarios.length - 1; i >= 0; i--) {
                var item = $rootScope.voluntarios[i];

                if ($scope.filterCodes(item)) {
                    var newObject = {};

                    newObject.id = item.id;
                    newObject.nome = item.nome;
                    newObject.telefone = item.telefone;
                    newObject.sexo = item.sexo;
                    newObject.data_nascimento = $filter('date')(item.data_nascimento, "dd/MM/yyyy");;
                    newObject.perfil = item.perfil;
                    newObject.cidade = item.cidade;
                    newObject.ativo = item.ativo;




                    returnArray.push(newObject);
                }
            }
            return returnArray;
        }

        $scope.filterCodes = function(obj) {
            var returnValue = true;

            if (returnValue && $scope.busca.sexo && $scope.busca.sexo.code) {
                returnValue = obj.sexo == $scope.busca.sexo.code;
            }

            if (returnValue && $scope.busca.perfil && $scope.busca.perfil.code) {
                returnValue = obj.perfil == $scope.busca.perfil.code;
            }

            if (returnValue && $scope.busca.ativo) {
                returnValue = obj.ativo == $scope.busca.ativo.code;
            }

            if (returnValue && $scope.busca.estado && $scope.busca.estado.code) {
                returnValue = obj.estado == $scope.busca.estado.code;
            }

            if (returnValue && $scope.busca.cidade && $scope.busca.cidade.code) {
                returnValue = obj.cidade == $scope.busca.cidade.code;
            }

            if (returnValue && $scope.busca.pesquisa) {
                var list = obj.pesquisas;
                var respondeu = false;
                for (var i = list.length - 1; i >= 0; i--) {
                    var itemPesquisa = list[i];
                    if (itemPesquisa.pesquisa.nome == $scope.busca.pesquisa.nome) {


                        if ($scope.busca.pesquisaRespondida != undefined) {


                            if ($scope.busca.pesquisaRespondida.code == 'sim') {
                                if (itemPesquisa.respondido != null) {
                                    respondeu = true;
                                }
                            } else if ($scope.busca.pesquisaRespondida.code == 'nao') {
                                if (itemPesquisa.respondido == null) {
                                    respondeu = true;
                                }
                            }


                        } else {
                            respondeu = true;
                        }
                    }
                }
                returnValue = respondeu;
            }

            if (returnValue && $scope.busca.tipoCategoria) {

            }

            if (returnValue && $scope.busca.tipoPesquisa) {

            }

            if (returnValue && $scope.busca.faixa_etaria && $scope.busca.faixa_etaria.code) {
                var age = ~~((Date.now() - obj.data_nascimento) / (31557600000));
                var filter = $scope.busca.faixa_etaria.code.split('|');
                returnValue = age >= filter[0] && age < filter[1];
                //console.log('faixa_etaria: ' + );
            }



            return returnValue;
        };




    });
