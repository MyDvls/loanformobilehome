import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Navigation
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.understanding-loan': 'Understanding Your Loan',
            'nav.team': 'Meet the Team',
            'nav.investors': 'Investors',
            'nav.contact': 'Contact',
            'nav.login': 'Login',
            'nav.apply': 'Apply Now',

            // Home Page
            'home.title': 'Your Path to Mobile Home Ownership Starts Here',

            'home.subtitle': 'Simple, transparent financing solutions for your manufactured home, with competitive rates and personalized service.',
            'home.cta': 'Start Your Application',

            //Process Section
            'process.title': 'GET YOUR LOAN IN 5 EASY STEPS',
            'process.step': 'Step',
            'process.ONE': 'ONE',
            'process.TWO': 'TWO',
            'process.THREE': 'THREE',
            'process.FOUR': 'FOUR',
            'process.FIVE': 'FIVE',
            'process.step1.title': 'Choose Your Home',
            'process.step1.description':
                'Choose a home and make sure you have the 20% downpayment. An agent must be working with you to buy your new home.',
            'process.step2.title': 'Apply Online',
            'process.step2.description': 'Start your application process through our website (15 min process!).',
            'process.step3.title': 'Get Pre-Approved',
            'process.step3.description':
                'MFS will contact you to gather basic financial documents to start your loan process and get you PRE-APPROVED.',
            'process.step4.title': 'Closing Preparation',
            'process.step4.description':
                "Get ready for closing. You can opt for a home inspection, and you must get insurance to get your loan! Let's protect your new asset.",
            'process.step5.title': 'Move In',
            'process.step5.description':
                'CONGRATULATIONS! YOU HAVE A NEW LOAN AND A NEW HOME. Make payments online and get your loan progress tracking from the comfort of your home.',
            'process.previousStep': 'Previous',
            'process.nextStep': 'Next',

            // Requirements Section
            'requirements.title': 'Get Started With An Application',
            'requirements.subtitle': 'Listed below are the items required by Mobile Fund Services for a new loan or refinance',
            'requirements.item1.title': 'Valid Colorado Drivers License or ID',
            'requirements.item1.description': "A photo or scan of a non-expired driver's license or state ID.",
            'requirements.item2.title': '2 Years of Personal Tax Returns',
            'requirements.item2.description': 'The most recent two years of federal tax returns showing all income.',
            'requirements.item3.title': 'Last 2 Months Proof of Employment',
            'requirements.item3.description': 'Photos or scans of pay stubs from the most recent two months.',
            'requirements.item4.title': 'Social Security Number or ITIN',
            'requirements.item4.description':
                'Your Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN) for identity verification and credit checks.',
            'requirements.item5.title': 'Purchase Agreement',
            'requirements.item5.description': 'A signed contract outlining the terms and conditions of the property purchase.',
            'requirements.item6.title': '20% Down Payment',
            'requirements.item6.description': "At least 20% of the property's purchase price as a down payment.",

            // Services Section
            'services.title': 'Services Designed for You',
            'services.subtitle': 'Tailored solutions to meet your home financing and investment needs.',
            'services.mortgage.title': 'Mortgage Loan Origination and Servicing',
            'services.mortgage.description':
                'At Mobile Fund Services, we excel as a mortgage originator and servicer, guiding you through every step of the lending process. Our experienced team works diligently to secure the best financing options tailored to your needs, ensuring a smooth and efficient journey from application to approval.',
            'services.closing.title': 'Closing and Title Transfer',
            'services.closing.description':
                'We also function as a closing and title transfer company, managing all the essential details to finalize your manufactured home purchase. Our meticulous attention to detail ensures that every aspect of the closing process is handled accurately and efficiently, giving you peace of mind.',
            'services.investment.title': 'Investment Management',
            'services.investment.description':
                'In addition, Mobile Fund Services offers comprehensive investment management services. Our expertise in the manufactured housing market allows us to provide strategic investment advice and management, helping you maximize returns and achieve your financial goals with confidence.',

            // Understanding Loan Section
            'understanding.title': 'Understanding Your Loan',
            'understanding.subtitle': 'Get clarity on your loan payments and how to pay off your loan smarter and faster.',
            'understanding.section1.title': 'How Your Monthly Payment Works',
            'understanding.section1.description':
                'When you take on a loan, your monthly payment is a combination of principal and interest. Though your monthly payment amount stays the same, the division between principal and interest changes as you pay it down.',
            'understanding.section1.principal': 'Principal Debt (loan amount)',
            'understanding.section1.interest': 'Interest (cost of borrowing)',
            'understanding.section1.escrow': 'Escrow (taxes + insurance) independent from MFS',
            'understanding.section1.tip':
                'At the start, most of your payment goes toward interest. Over time, more goes toward paying off your principal debt.',
            'understanding.section2.title': 'Making Additional Payments',
            'understanding.section2.additional': 'Additional payments = pay off faster!',
            'understanding.section2.interestSave': 'Extra payments go directly to the Principal. You save on interest.',
            'understanding.section2.termShorten': 'Loan term shortens — monthly payment stays the same.',
            'understanding.section2.result': 'Result: You own your home sooner, and pay less in total.',
            'understanding.section1.graph1.title': ' How Does Interest Work on my Loan?',
            'understanding.section1.graph2.tip':
                'Making additional payments reduces your principal balance faster, allowing you to build equity quicker and potentially saving thousands in interest over the life of your loan.',

            // Team Page
            'team.title': 'Meet the Team',
            'team.subtitle': 'Get to know the dedicated professionals behind Mobile Fund Services.',
            'team.member1.bio':
                'Grayson Gibson is co-founder and CEO of Mobile Fund Services LLC. He brings more than ten years of executive experience lending to the manufactured housing market. As a licensed Mortgage Loan Originator and CEO, he has provided essential aid in financing affordable housing in the Colorado Front Range. Mr. Gibson has funded over $10 million in manufactured home loans in the past couple of years. Previously, Grayson worked as VP at Sam’s Housing LLC., a manufactured home retail agency, and doubled the business’s income which is grossing over $60 million in sales over the past 15 years. While working for Sam’s Housing he developed a deep knowledge of the industry, its target markets, and business gaps, which led to the creation of Mobile Fund Service. Born and raised in Colorado, Grayson started his career while still attending college by personally financing manufactured homes. Once out of college he pursued a career as a financial advisor with Northwestern Mutual while still being a retailer and financier of manufactured housing. Grayson saw the growing opportunity in the latter sector and decided to work with Sam’s Housing full-time while, in parallel, creating his own company with Cord Mossberg. After living one year abroad, Mr. Gibson married Maria Del Pilar, a Mexico City native. He has found a growing love and connection for Mexican culture. Fluent in Spanish, he enjoys learning and working with the Hispanic community in Colorado as well as assisting in their need for affordable housing. Mr. Gibson holds B.S in Finance and Computer Information Systems from Colorado State University.',
            'team.member2.bio':
                'Cord W. Mossberg is a 10-year veteran of Wall Street. Having first worked with trading clients on various trading exchange floors including the New York Stock Exchange, American Stock Exchange, Chicago Board Options Exchange, Mr. Mossberg later transitioned to support and assist more institutional investment clients. While growing his client base across different investor profiles, Mr. Mossberg supported clients in investing in various asset classes including US-listed Equities, Equity Options, and Futures. By maintaining relationships with the different investors, Mr. Mossberg has continued to learn and understand the various approaches to investing. A Colorado native, Mr. Mossberg ultimately wanted to return to his roots and use his investing knowledge in his home state. After a brief time in Mexico, where Mr. Mossberg lived to study Spanish and research the opportunities in lending internationally, he found that there was great potential in helping lower-income families procure financial stability. He returned to Colorado where he connected with his good friend and business partner Grayson Gibson. Combining Mr. Gibson’s knowledge of the Manufactured Home industry with his own investing experience, Mr. Mossberg and Mr. Gibson started Mobile Fund Services, LLC. Mr. Mossberg holds Financial Industry Regulatory Authority (FINRA/NASD) Licenses Series 7, Series 63, Series 4, Series 3.',
            'team.member3.bio':
                'Chance Schaeffer serves as the Managing Broker at Mobile Fund Services LLC, bringing a wealth of experience in real estate and financial services. With a keen eye for market opportunities and a passion for helping clients achieve their housing goals, Chance has become a trusted advisor in the manufactured housing sector. His innovative approach to brokerage, combined with a deep understanding of the Colorado market, has enabled him to facilitate numerous successful transactions. Chance holds a degree in Business Administration from the University of Colorado and is a licensed real estate broker. His commitment to excellence and client satisfaction drives the company’s mission to provide affordable housing solutions.',
               //Investors Page
            'investors.title': 'Investor Login',
            // Apply Page
            'apply.title': 'New Application',
            'apply.form.stepIndicator': 'Step {{step}} of {{total}}',
            'apply.form.previous': 'Previous',
            'apply.form.next': 'Next',
            'apply.form.submit': 'Submit',
            'apply.form.step1.title': 'Borrower Information',
            'apply.form.step1.firstName': 'First Name',
            'apply.form.step1.middleName': 'Middle Name',
            'apply.form.step1.lastName': 'Last Name',
            'apply.form.step1.generationCode': 'Generation Code',
            'apply.form.step1.selectGeneration': 'Select generation code',
            'apply.form.step1.generation.none': 'None',
            'apply.form.step1.generation.jr': 'Jr.',
            'apply.form.step1.generation.sr': 'Sr.',
            'apply.form.step1.generation.ii': 'II',
            'apply.form.step1.generation.iii': 'III',
            'apply.form.step1.ssn': 'Social Security Number or ITIN',
            'apply.form.step1.driverLicense': 'Driver License Number',
            'apply.form.step1.dateOfBirth': 'Date of Birth',
            'apply.form.step1.gender': 'Gender',
            'apply.form.step1.gender.female': 'Female',
            'apply.form.step1.gender.male': 'Male',
            'apply.form.step2.title': 'Contact Information',
            'apply.form.step2.address': 'Address',
            'apply.form.step2.city': 'City',
            'apply.form.step2.state': 'State',
            'apply.form.step2.selectState': 'Select state',
            'apply.form.step2.zipCode': 'ZIP Code',
            'apply.form.step2.phone': 'Phone',
            'apply.form.step2.email': 'Email',
            'apply.form.step3.title': 'Employment Information',
            'apply.form.step3.companyName': 'Company Name',
            'apply.form.step3.personalTitle': 'Title',
            'apply.form.step3.hireDate': 'Hire Date',
            'apply.form.step3.income': 'Income',
            'apply.form.step3.incomeFrequency': 'Income Frequency',
            'apply.form.step3.selectFrequency': 'Select frequency',
            'apply.form.step3.frequency.weekly': 'Weekly',
            'apply.form.step3.frequency.biWeekly': 'Bi-Weekly',
            'apply.form.step3.frequency.monthly': 'Monthly',
            'apply.form.step3.frequency.annually': 'Annually',
            'apply.form.step4.title': 'New Home Information',
            'apply.form.step4.homeAddress': 'Address',
            'apply.form.step4.homeCity': 'City',
            'apply.form.step4.homeState': 'State',
            'apply.form.step4.selectState': 'Select state',
            'apply.form.step4.homeZipCode': 'ZIP Code',
            'apply.form.step4.vin': 'VIN',
            'apply.form.step4.year': 'Year',
            'apply.form.step4.manufactureName': 'Manufacture Name',
            'apply.form.step4.homeSize': 'Size of Home (Length x Width)',
            'apply.form.step4.homeSizePlaceholder': 'e.g., 60x12',
            'apply.form.step4.termsAccepted':
                'I understand and agree that I am applying for credit by completing and submitting this credit application. I certify that the information on the application is true and complete. I understand that false statements may subject me to legal consequences.',
            'apply.form.step4.backgroundCheckAccepted':
                'I hereby authorize Mobile Fund Services LLC and its designated agents to conduct a comprehensive review of my background causing a consumer report and/or an investigative consumer report to be generated for loan application.',

            // Footer
            'footer.rights': 'All Rights Reserved.',
            'footer.about': 'About',
            'footer.contact': 'Contact Us',
            'footer.team': 'Meet the Team',
            'footer.investors': 'Investors',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms and Conditions',
            'footer.whatsapp': 'Chat on WhatsApp',
            'footer.hours': 'Working Hours',
            'footer.monday': 'Monday: 9:00 am – 5:00 pm',
            'footer.tuesday': 'Tuesday: 9:00 am – 5:00 pm',
            'footer.wednesday': 'Wednesday: 9:00 am – 5:00 pm',
            'footer.thursday': 'Thursday: 9:00 am – 5:00 pm',
            'footer.friday': 'Friday: 9:00 am – 5:00 pm',
            'footer.saturday': 'Saturday: Closed',
            'footer.sunday': 'Sunday: Closed',
        },
    },
    es: {
        translation: {
            // Navigation
            'nav.home': 'Inicio',
            'nav.services': 'Servicios',
            'nav.understanding-loan': 'Entendiendo Su Préstamo',
            'nav.team': 'Conozca al Equipo',
            'nav.investors': 'Inversores',
            'nav.contact': 'Contacto',
            'nav.login': 'Iniciar Sesión',
            'nav.apply': 'Aplicar Ahora',

            // Home Page
            'home.title': 'Su Camino hacia la Propiedad de una Casa Móvil Comienza Aquí',
            'home.subtitle':
                'Soluciones de financiamiento simples y transparentes para su casa prefabricada, con tasas competitivas y servicio personalizado.',
            'home.cta': 'Inicia tu solicitud',

            //Process Section
            'process.title': 'Obtén tu préstamo en 5 sencillos pasos',
            'process.step': 'Paso',
            'process.ONE': 'UNO',
            'process.TWO': 'DOS',
            'process.THREE': 'TRES',
            'process.FOUR': 'CUATRO',
            'process.FIVE': 'CINCO',
            'process.step1.title': 'Elige tu casa',
            'process.step1.description':
                'Elija una casa y asegúrese de tener el 20% de enganche. Un agente debe trabajar con usted para comprar su nueva casa.',
            'process.step2.title': 'Aplicar en línea',
            'process.step2.description': 'Comienza tu proceso de solicitud a través de nuestro sitio web (¡proceso de 15 min!).',
            'process.step3.title': 'Obtenga una aprobación previa',
            'process.step3.description':
                'MFS se comunicará con usted para reunir los documentos financieros básicos para iniciar su proceso de préstamo y obtener su PREAPROBACIÓN.',
            'process.step4.title': 'Preparación de cierre',
            'process.step4.description':
                'Prepárese para el cierre. Puede optar por una inspección de la vivienda y debe obtener un seguro para obtener su préstamo. Protejamos su nuevo activo.',
            'process.step5.title': 'Avanzar',
            'process.step5.description':
                '¡FELICIDADES! TIENES UN NUEVO PRÉSTAMO Y UNA CASA NUEVA. Realiza pagos en línea y consulta el progreso de tu préstamo desde la comodidad de tu hogar.',
            'process.previousStep': 'Anterior',
            'process.nextStep': 'Siguiente',

            // Requirements Section
            'requirements.title': 'Comience con una Solicitud',
            'requirements.subtitle':
                'A continuación se enumeran los elementos requeridos por Mobile Fund Services para un nuevo préstamo o refinanciamiento',
            'requirements.item1.title': 'Licencia de Conducir o Identificación de Colorado Válida',
            'requirements.item1.description': 'Una foto o escaneo de una licencia de conducir o identificación estatal no vencida.',
            'requirements.item2.title': '2 Años de Declaraciones de Impuestos Personales',
            'requirements.item2.description': 'Las declaraciones de impuestos federales de los últimos dos años que muestren todos los ingresos.',
            'requirements.item3.title': 'Comprobante de Empleo de los Últimos 2 Meses',
            'requirements.item3.description': 'Fotos o escaneos de los talones de pago de los últimos dos meses.',
            'requirements.item4.title': 'Número de Seguro Social o ITIN',
            'requirements.item4.description':
                'Su Número de Seguro Social (SSN) o Número de Identificación del Contribuyente Individual (ITIN) para verificación de identidad y revisiones de crédito.',
            'requirements.item5.title': 'Contrato de Compra',
            'requirements.item5.description': 'Un contrato firmado que detalla los términos y condiciones de la compra de la propiedad.',
            'requirements.item6.title': '20% de Enganche',
            'requirements.item6.description': 'Al menos el 20% del precio de compra de la propiedad como enganche.',

            // Services Section
            'services.title': 'Servicios Diseñados para Usted',
            'services.subtitle': 'Soluciones personalizadas para satisfacer sus necesidades de financiamiento e inversión.',
            'services.mortgage.title': 'Originación y Gestión de Préstamos Hipotecarios',
            'services.mortgage.description':
                'En Mobile Fund Services, destacamos como originadores y gestores de préstamos hipotecarios, guiándolo en cada paso del proceso de préstamo. Nuestro equipo experimentado trabaja diligentemente para asegurar las mejores opciones de financiamiento adaptadas a sus necesidades, garantizando un proceso fluido y eficiente desde la solicitud hasta la aprobación.',
            'services.closing.title': 'Cierre y Transferencia de Títulos',
            'services.closing.description':
                'También funcionamos como una empresa de cierre y transferencia de títulos, manejando todos los detalles esenciales para finalizar la compra de su casa prefabricada. Nuestra meticulosa atención al detalle asegura que cada aspecto del proceso de cierre se gestione de manera precisa y eficiente, brindándole tranquilidad.',
            'services.investment.title': 'Gestión de Inversiones',
            'services.investment.description':
                'Además, Mobile Fund Services ofrece servicios integrales de gestión de inversiones. Nuestra experiencia en el mercado de viviendas prefabricadas nos permite proporcionar asesoramiento y gestión de inversiones estratégicas, ayudándolo a maximizar retornos y alcanzar sus objetivos financieros con confianza.',

            // Understanding Loan Section
            'understanding.title': 'Entendiendo Su Préstamo',
            'understanding.subtitle': 'Obtenga claridad sobre sus pagos de préstamo y cómo pagar su préstamo de manera más inteligente y rápida.',
            'understanding.section1.title': 'Cómo Funciona Su Pago Mensual',
            'understanding.section1.description':
                'Al solicitar un préstamo, su pago mensual es una combinación de capital e intereses. Aunque el monto de su pago mensual se mantiene constante, la distribución entre capital e intereses cambia a medida que paga el préstamo.',
            'understanding.section1.principal': 'Deuda Principal (monto del préstamo)',
            'understanding.section1.interest': 'Intereses (costo del préstamo)',
            'understanding.section1.escrow': 'Escrow (impuestos + seguro) independiente de MFS',
            'understanding.section1.tip':
                'Al inicio, la mayor parte de su pago va a los intereses. Con el tiempo, más se destina a pagar su deuda principal.',
            'understanding.section2.title': 'Haciendo Pagos Adicionales',
            'understanding.section2.additional': '¡Pagos adicionales = pagar más rápido!',
            'understanding.section2.interestSave': 'Los pagos extras van directamente al Principal. ¡Ahorra en intereses!',
            'understanding.section2.termShorten': 'El plazo del préstamo se acorta — el pago mensual permanece igual.',
            'understanding.section2.result': 'Resultado: ¡Posee su casa antes y paga menos en total!',
            'understanding.section1.graph1.title': '¿Cómo funciona el interés de mi préstamo?',
            'understanding.section1.graph2.tip':
                'Realizar pagos adicionales reduce su saldo principal más rápido, lo que le permite generar capital más rápidamente y potencialmente ahorrar miles en intereses durante la vida de su préstamo.',

            // Team Page
            'team.title': 'Conoce al equipo',
            'team.subtitle': 'Conozca a los profesionales dedicados detrás de Mobile Fund Services.',
            'team.member1.bio':
                "Grayson Gibson es cofundador y director ejecutivo de Mobile Fund Services LLC. Cuenta con más de diez años de experiencia ejecutiva en la financiación de viviendas prefabricadas. Como originador de préstamos hipotecarios con licencia y director ejecutivo, ha brindado asistencia esencial para la financiación de viviendas asequibles en la Cordillera Frontal de Colorado. El Sr. Gibson ha financiado más de 10 millones de dólares en préstamos para viviendas prefabricadas en los últimos dos años. Anteriormente, Grayson trabajó como vicepresidente en Sam's Housing LLC, una agencia minorista de viviendas prefabricadas, y duplicó los ingresos de la empresa, que acumula más de 60 millones de dólares en ventas en los últimos 15 años. Durante su trabajo en Sam's Housing, desarrolló un profundo conocimiento de la industria, sus mercados objetivo y las carencias del negocio, lo que condujo a la creación de Mobile Fund Service. Nacido y criado en Colorado, Grayson comenzó su carrera mientras aún asistía a la universidad, financiando personalmente viviendas prefabricadas. Una vez graduado, se dedicó a la asesoría financiera en Northwestern Mutual mientras seguía siendo minorista y financista de viviendas prefabricadas. Grayson vio la creciente oportunidad en este último sector y decidió trabajar a tiempo completo en Sam's Housing, mientras que, paralelamente, creó su propia empresa con Cord Mossberg. Tras vivir un año en el extranjero, el Sr. Gibson se casó con María del Pilar, originaria de la Ciudad de México. Ha desarrollado un creciente amor y conexión con la cultura mexicana. Habla español con fluidez y disfruta aprendiendo y trabajando con la comunidad hispana de Colorado, además de ayudar a satisfacer su necesidad de vivienda asequible. El Sr. Gibson es licenciado en Finanzas y Sistemas de Información Computacional por la Universidad Estatal de Colorado.",
            'team.member2.bio':
                'Cord W. Mossberg es un veterano con 10 años de experiencia en Wall Street. Tras trabajar inicialmente con clientes en diversas bolsas de valores, como la Bolsa de Valores de Nueva York, la Bolsa de Valores de Estados Unidos y la Bolsa de Opciones de Chicago, el Sr. Mossberg posteriormente se dedicó a apoyar y asistir a clientes de inversión más institucionales. A la vez que ampliaba su cartera de clientes con diferentes perfiles de inversores, el Sr. Mossberg los apoyaba en la inversión en diversas clases de activos, como acciones cotizadas en EE. UU., opciones sobre acciones y futuros. Al mantener relaciones con los diferentes inversores, el Sr. Mossberg ha seguido aprendiendo y comprendiendo los diversos enfoques de inversión. Originario de Colorado, el Sr. Mossberg quiso regresar a sus raíces y aplicar sus conocimientos de inversión en su estado natal. Tras una breve estancia en México, donde residió para estudiar español e investigar las oportunidades de financiación internacional, descubrió un gran potencial para ayudar a familias de bajos ingresos a lograr estabilidad financiera. Regresó a Colorado, donde contactó con su buen amigo y socio Grayson Gibson. Combinando el conocimiento del Sr. Gibson sobre la industria de las casas prefabricadas con su propia experiencia en inversiones, el Sr. Mossberg y el Sr. Gibson fundaron Mobile Fund Services, LLC. El Sr. Mossberg posee las licencias de la Autoridad Reguladora de la Industria Financiera (FINRA/NASD) Serie 7, Serie 63, Serie 4 y Serie 3..',
            'team.member3.bio':
                'Chance Schaeffer se desempeña como Corredor Administrativo en Mobile Fund Services LLC, aportando una vasta experiencia en bienes raíces y servicios financieros. Con una visión clara de las oportunidades del mercado y una pasión por ayudar a los clientes a alcanzar sus objetivos de vivienda, Chance se ha convertido en un asesor de confianza en el sector de las viviendas prefabricadas. Su enfoque innovador en la intermediación, combinado con un profundo conocimiento del mercado de Colorado, le ha permitido facilitar numerosas transacciones exitosas. Chance es licenciado en Administración de Empresas por la Universidad de Colorado y es corredor inmobiliario con licencia. Su compromiso con la excelencia y la satisfacción del cliente impulsa la misión de la empresa: brindar soluciones de vivienda asequible.',

                //Investors Page
            'investors.title': 'Inversores',

            // Apply Page
            'apply.title': 'Nueva Solicitud',
            'apply.form.stepIndicator': 'Paso {{step}} de {{total}}',
            'apply.form.previous': 'Anterior',
            'apply.form.next': 'Siguiente',
            'apply.form.submit': 'Enviar',
            'apply.form.step1.title': 'Información del Solicitante',
            'apply.form.step1.firstName': 'Nombre',
            'apply.form.step1.middleName': 'Segundo Nombre',
            'apply.form.step1.lastName': 'Apellido',
            'apply.form.step1.generationCode': 'Código de Generación',
            'apply.form.step1.selectGeneration': 'Seleccione el código de generación',
            'apply.form.step1.generation.none': 'Ninguno',
            'apply.form.step1.generation.jr': 'Jr.',
            'apply.form.step1.generation.sr': 'Sr.',
            'apply.form.step1.generation.ii': 'II',
            'apply.form.step1.generation.iii': 'III',
            'apply.form.step1.ssn': 'Número de Seguro Social o ITIN',
            'apply.form.step1.driverLicense': 'Número de Licencia de Conducir',
            'apply.form.step1.dateOfBirth': 'Fecha de Nacimiento',
            'apply.form.step1.gender': 'Género',
            'apply.form.step1.gender.female': 'Femenino',
            'apply.form.step1.gender.male': 'Masculino',
            'apply.form.step2.title': 'Información de Contacto',
            'apply.form.step2.address': 'Dirección',
            'apply.form.step2.city': 'Ciudad',
            'apply.form.step2.state': 'Estado',
            'apply.form.step2.selectState': 'Seleccione el estado',
            'apply.form.step2.zipCode': 'Código ZIP',
            'apply.form.step2.phone': 'Teléfono',
            'apply.form.step2.email': 'Correo Electrónico',
            'apply.form.step3.title': 'Información Laboral',
            'apply.form.step3.companyName': 'Nombre de la Empresa',
            'apply.form.step3.personalTitle': 'Título',
            'apply.form.step3.hireDate': 'Fecha de Contratación',
            'apply.form.step3.income': 'Ingresos',
            'apply.form.step3.incomeFrequency': 'Frecuencia de Ingresos',
            'apply.form.step3.selectFrequency': 'Seleccione la frecuencia',
            'apply.form.step3.frequency.weekly': 'Semanal',
            'apply.form.step3.frequency.biWeekly': 'Quincenal',
            'apply.form.step3.frequency.monthly': 'Mensual',
            'apply.form.step3.frequency.annually': 'Anual',
            'apply.form.step4.title': 'Información de la Nueva Vivienda',
            'apply.form.step4.homeAddress': 'Dirección',
            'apply.form.step4.homeCity': 'Ciudad',
            'apply.form.step4.homeState': 'Estado',
            'apply.form.step4.selectState': 'Seleccione el estado',
            'apply.form.step4.homeZipCode': 'Código ZIP',
            'apply.form.step4.vin': 'VIN',
            'apply.form.step4.year': 'Año',
            'apply.form.step4.manufactureName': 'Nombre del Fabricante',
            'apply.form.step4.homeSize': 'Tamaño de la Vivienda (Largo x Ancho)',
            'apply.form.step4.homeSizePlaceholder': 'ej. 60x12',
            'apply.form.step4.termsAccepted':
                'Entiendo y acepto que al completar y enviar esta solicitud de crédito estoy solicitando crédito. Certifico que la información en la solicitud es verdadera y completa. Entiendo que las declaraciones falsas pueden someterme a consecuencias legales.',
            'apply.form.step4.backgroundCheckAccepted':
                'Por la presente autorizo a Mobile Fund Services LLC y a sus agentes designados a realizar una revisión exhaustiva de mi historial, lo que generará un informe de consumidor y/o un informe de investigación de consumidor para la solicitud de préstamo.',

            //Footer
            'footer.rights': 'Todos los derechos reservados.',
            'footer.about': 'Acerca de',
            'footer.contact': 'Contáctanos',
            'footer.team': 'Conoce al Equipo',
            'footer.investors': 'Inversores',
            'footer.privacy': 'Política de Privacidad',
            'footer.terms': 'Términos y Condiciones',
            'footer.whatsapp': 'Chatear en WhatsApp',
            'footer.hours': 'Horario de Trabajo',
            'footer.monday': 'Lunes: 9:00 am – 5:00 pm',
            'footer.tuesday': 'Martes: 9:00 am – 5:00 pm',
            'footer.wednesday': 'Miércoles: 9:00 am – 5:00 pm',
            'footer.thursday': 'Jueves: 9:00 am – 5:00 pm',
            'footer.friday': 'Viernes: 9:00 am – 5:00 pm',
            'footer.saturday': 'Sábado: Cerrado',
            'footer.sunday': 'Domingo: Cerrado',
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
