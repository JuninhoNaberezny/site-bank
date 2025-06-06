import React, { useState, useEffect } from 'react';

// Mock API - Simula uma API externa para produtos e autenticação
const mockApi = {
    products: [
        "Financiamento Imóvel", "Financiamento de Construção ou Término de Obras", "Home Equity",
        "Financiamento Auto", "Financiamento de Pesados", "Auto Equity", "Garantia Estendida Motor e Câmbio",
        "Consórcios", "Assistência Auto", "Capital de Giro", "Cartas Contempladas", "Antecipação de Recebíveis",
        "BNDS", "Pronampe", "Crédito para condomínio", "Crédito de Energia Solar", "Financiamento Placa Solar",
        "Empréstimo Pessoal", "Câmbio", "Planos de Saúde", "Seguros", "Antecipação de FGTS",
        "Empréstimo Consignado Privado", "Empréstimo Consignado Público", "Previdência complementar",
        "Seguros com cobertura para Acidentes Pessoais", "Assistência Saúde", "Assistências Bank",
        "Assistência Residencial", "Assistência Pet"
    ],
    login: (email, password) => {
        if (email === 'gerente@bank.com' && password === 'admin123') {
            return { success: true, user: { name: 'Gerente Bank', role: 'manager' } };
        }
        if (email === 'cliente@bank.com' && password === 'user123') {
            return { success: true, user: { name: 'Cliente Teste', role: 'client' } };
        }
        return { success: false, message: 'Credenciais inválidas.' };
    }
};

// --- COMPONENTES AUXILIARES ---

// Ícone de check para a mensagem de sucesso
const CheckIcon = () => (
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

// Componente para a mensagem de sucesso
const SuccessMessage = ({ message }) => (
    <div className="mt-4 p-4 flex items-center bg-green-100 text-green-800 rounded-lg shadow-md transition-all duration-300">
        <CheckIcon />
        {message}
    </div>
);


// Ícones (SVGs)
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const BankIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
    </svg>
);

// --- COMPONENTES PRINCIPAIS ---

// Componente Header
const Header = ({ setPage, user, onLogout }) => (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
                <BankIcon />
                <h1 className="text-xl font-bold ml-2">Site Bank</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="hover:text-cyan-400 transition-colors">Início</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('products'); }} className="hover:text-cyan-400 transition-colors">Produtos e Serviços</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('faq'); }} className="hover:text-cyan-400 transition-colors">Perguntas Frequentes</a>
                {user ? (
                    <div className="relative group">
                         <span className="cursor-pointer hover:text-cyan-400">{user.name}</span>
                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                            <a href="#" onClick={(e) => { e.preventDefault(); setPage(user.role === 'manager' ? 'managerDashboard' : 'clientDashboard'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-500 hover:text-white">Painel</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-500 hover:text-white">Sair</a>
                         </div>
                    </div>
                ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full font-semibold transition-colors">
                        Acesse sua Conta
                    </a>
                )}
            </nav>
            <div className="md:hidden">
                 <button onClick={() => setPage(user ? (user.role === 'manager' ? 'managerDashboard' : 'clientDashboard') : 'login')} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full font-semibold transition-colors text-sm">
                        {user ? 'Painel' : 'Login'}
                 </button>
            </div>
        </div>
    </header>
);

// Componente Footer
const Footer = () => (
    <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <div className="flex items-center">
                        <BankIcon />
                        <h2 className="text-2xl font-bold ml-2">Site Bank</h2>
                    </div>
                    <p className="mt-2 text-gray-400">Conectando você ao seu futuro financeiro.</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    <div>
                        <h3 className="font-bold uppercase text-cyan-400">Contato</h3>
                        <p className="text-gray-400 mt-2">contato@sitebank.com</p>
                        <p className="text-gray-400">(11) 99999-9999</p>
                    </div>
                    <div>
                        <h3 className="font-bold uppercase text-cyan-400">Legal</h3>
                        <a href="#" className="block mt-2 text-gray-400 hover:text-white">Termos de Uso</a>
                        <a href="#" className="block mt-1 text-gray-400 hover:text-white">Política de Privacidade</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Site Bank. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
);

// Componente da Página Inicial
const HomePage = ({ setPage }) => (
    <div className="container mx-auto px-6 py-12 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
             <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
                A plataforma completa que <span className="text-cyan-500">transforma</span> sua relação com o sistema financeiro.
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Bem-vindo à Bank, onde descomplicamos o sistema financeiro e conectamos você às melhores oportunidades.
            </p>
            <button
                onClick={() => setPage('products')}
                className="mt-10 bg-cyan-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center mx-auto"
            >
                Conheça nossos produtos
                <ArrowRightIcon />
            </button>
        </div>
    </div>
);

// Componente da Página de Produtos
const ProductsPage = ({ setPage, setSelectedProduct }) => {
    const products = mockApi.products;

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setPage('productDetail');
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nossos Produtos e Serviços</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <div
                        key={product}
                        onClick={() => handleProductClick(product)}
                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                        <h3 className="font-semibold text-lg text-gray-700">{product}</h3>
                        <button onClick={(e) => { e.stopPropagation(); handleProductClick(product); }} className="text-cyan-500 font-semibold mt-4 text-sm">Saiba Mais</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente da Página de Detalhe do Produto
const ProductDetailPage = ({ product, setPage }) => {
    const renderForm = () => {
        switch(product) {
            case 'Planos de Saúde':
                return <HealthPlanForm />;
            case 'Financiamento Imóvel':
                return <RealEstateFinancingForm />;
            default:
                // Formulário genérico para outros produtos
                return <GenericContactForm />;
        }
    }
    
    return (
        <div className="container mx-auto px-6 py-12">
             <button onClick={() => setPage('products')} className="mb-8 text-cyan-600 hover:text-cyan-800 font-semibold">
                &larr; Voltar para todos os produtos
             </button>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                 <h2 className="text-4xl font-bold mb-2 text-gray-800">{product}</h2>
                 <p className="text-gray-500 mb-8">Preencha o formulário abaixo para solicitar uma proposta. Um de nossos especialistas entrará em contato em breve.</p>
                 {renderForm()}
            </div>
        </div>
    );
};

// --- FORMULÁRIOS ---

// Formulário Genérico
const GenericContactForm = () => {
    const [status, setStatus] = useState('idle');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
        console.log("Formulário genérico enviado!");
        
        setTimeout(() => {
            setStatus('idle');
            e.target.reset(); // Limpa o formulário
        }, 4000);
    };

    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Nome Completo" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required />
            <input type="email" placeholder="Seu melhor e-mail" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required />
            <input type="tel" placeholder="Telefone com DDD" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required />
            <textarea placeholder="Mensagem (opcional)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500"></textarea>
            <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors">Enviar Solicitação</button>
            {status === 'success' && <SuccessMessage message="Solicitação enviada com sucesso! Logo entraremos em contato." />}
        </form>
    );
};

// Formulário de Financiamento Imobiliário
const RealEstateFinancingForm = () => {
    const [formData, setFormData] = useState({
        product: 'Financiamento Imobiliário',
        propertyValue: '',
        financingValue: '',
        birthDate: '',
        term: '',
        fullName: '',
        cpf: '',
        email: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        console.log("Enviando dados do lead:", formData);

        // Simula uma chamada de API
        setTimeout(() => {
            setStatus('success');
            // Limpa o formulário
            setFormData({
                product: 'Financiamento Imobiliário', propertyValue: '', financingValue: '',
                birthDate: '', term: '', fullName: '', cpf: '', email: ''
            });
            // Esconde a mensagem de sucesso após alguns segundos
            setTimeout(() => setStatus('idle'), 5000);
        }, 1000);
    };

    return (
         <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Simule seu Financiamento Imobiliário</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Produto</label>
                    <select name="product" value={formData.product} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-cyan-500">
                        <option>Financiamento Imobiliário</option>
                        <option>Crédito com Garantia Imobiliária</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Valor do Imóvel (R$)</label>
                    <input type="number" name="propertyValue" value={formData.propertyValue} onChange={handleChange} placeholder="250000" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Valor do Financiamento (R$)</label>
                    <input type="number" name="financingValue" value={formData.financingValue} onChange={handleChange} placeholder="200000" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Data de Nascimento</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Prazo (em meses)</label>
                    <input type="number" name="term" value={formData.term} onChange={handleChange} placeholder="Até 420 meses" max="420" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                 <h4 className="md:col-span-2 text-lg font-semibold text-gray-700 mt-4">Dados Pessoais</h4>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nome Completo</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Seu nome completo" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">CPF</label>
                    <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                <div className="md:col-span-2 mt-4">
                     <button type="submit" disabled={status === 'submitting'} className="w-full bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-cyan-600 transition-colors text-lg disabled:bg-gray-400">
                        {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitação'}
                     </button>
                </div>
                 {status === 'success' && <div className="md:col-span-2"><SuccessMessage message="Proposta enviada! Em breve um de nossos especialistas entrará em contato." /></div>}
            </form>
        </div>
    );
};

// Formulário de Planos de Saúde
const HealthPlanForm = () => {
    // Implementação similar ao formulário de financiamento
    const [formData, setFormData] = useState({
        profile: 'Pessoa Física',
        fullName: '',
        cpf: '',
        phone: '',
        email: '',
        occupation: 'Assalariado',
        coparticipation: 'Sim',
        lives: 1
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        console.log("Enviando dados do lead (Plano de Saúde):", formData);

        setTimeout(() => {
            setStatus('success');
            setFormData({
                profile: 'Pessoa Física', fullName: '', cpf: '', phone: '', email: '',
                occupation: 'Assalariado', coparticipation: 'Sim', lives: 1
            });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1000);
    };
    
    return (
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Solicite seu Plano de Saúde</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Perfil</label>
                    <select name="profile" value={formData.profile} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-cyan-500">
                        <option>Pessoa Física</option>
                        <option>Pessoa Jurídica</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nome Completo</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Seu nome completo" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">CPF</label>
                    <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Telefone com DDD</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(00) 00000-0000" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Natureza da Ocupação</label>
                    <select name="occupation" value={formData.occupation} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-cyan-500">
                        <option>Assalariado</option><option>Aposentado</option><option>Autônomo</option>
                        <option>Empresário</option><option>Profissional Liberal</option><option>Estudante</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Deseja plano com coparticipação?</label>
                    <select name="coparticipation" value={formData.coparticipation} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-cyan-500">
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Quantidade de vidas</label>
                    <input type="number" name="lives" value={formData.lives} onChange={handleChange} placeholder="1" min="1" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" required/>
                </div>
                <div className="md:col-span-2 mt-4">
                     <button type="submit" disabled={status === 'submitting'} className="w-full bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-cyan-600 transition-colors text-lg disabled:bg-gray-400">
                         {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitação'}
                     </button>
                </div>
                {status === 'success' && <div className="md:col-span-2"><SuccessMessage message="Solicitação enviada! Em breve um de nossos especialistas entrará em contato." /></div>}
            </form>
        </div>
    );
};


// Componente da Página de FAQ
const FaqPage = () => {
    const faqs = [
        { q: "Como funciona a plataforma?", a: "Nossa plataforma conecta você a diversas instituições financeiras, simplificando o processo de contratação de produtos como financiamentos, seguros e consórcios." },
        { q: "Meus dados estão seguros?", a: "Sim. Utilizamos as mais modernas práticas de segurança para garantir a proteção total dos seus dados." },
        { q: "Quais os custos para usar a plataforma?", a: "A utilização da plataforma para cotações e solicitações é gratuita. As taxas e custos são referentes aos produtos contratados diretamente com as instituições parceiras." },
        { q: "Como me torno um parceiro?", a: "Entre em contato através do nosso e-mail de parcerias e nossa equipe analisará sua solicitação." },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-semibold text-lg text-gray-800">{faq.q}</h3>
                        <p className="mt-2 text-gray-600">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente da Página de Login
const LoginPage = ({ setPage, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const result = mockApi.login(email, password);
        if (result.success) {
            onLogin(result.user);
            const targetPage = result.user.role === 'manager' ? 'managerDashboard' : 'clientDashboard';
            setPage(targetPage);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Acesse sua Conta</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="gerente@bank.com ou cliente@bank.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="admin123 ou user123"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors">
                            Entrar
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-cyan-600 hover:underline">Esqueci minha senha</a>
                    <p className="mt-2 text-sm text-gray-500">Não tem uma conta? <a href="#" className="text-cyan-600 hover:underline">Cadastre-se</a></p>
                </div>
            </div>
        </div>
    );
};

// --- PAINÉIS DE CONTROLE ---

// Painel do Gerente
const ManagerDashboard = ({ user }) => (
    <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Painel do Gerente</h2>
        <p className="text-xl text-gray-600 mb-8">Bem-vindo, {user.name}!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-bold text-cyan-500">15</h3>
                <p className="text-gray-600">Novas Propostas</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-bold text-cyan-500">8</h3>
                <p className="text-gray-600">Clientes Ativos</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-bold text-cyan-500">R$ 1.2M</h3>
                <p className="text-gray-600">Volume em Análise</p>
            </div>
        </div>
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
             <h3 className="text-2xl font-semibold mb-4 text-gray-700">Ações Rápidas</h3>
             <div className="flex flex-wrap gap-4">
                 <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600">Ver Clientes</button>
                 <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">Analisar Propostas</button>
                 <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">Gerar Relatórios</button>
             </div>
        </div>
    </div>
);

// Painel do Cliente
const ClientDashboard = ({ user, setPage }) => (
     <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Minha Conta</h2>
        <p className="text-xl text-gray-600 mb-8">Bem-vindo, {user.name}!</p>
        <div className="bg-white p-8 rounded-xl shadow-lg">
             <h3 className="text-2xl font-semibold mb-4 text-gray-700">Meus Produtos</h3>
             <div className="border-t pt-4 text-center">
                 <p className="text-gray-700">Você ainda não possui produtos contratados.</p>
                 <button onClick={() => setPage('products')} className="mt-4 text-cyan-600 font-semibold hover:underline">
                    Explore nossos produtos e serviços
                 </button>
             </div>
        </div>
    </div>
);


// Componente principal da aplicação
export default function App() {
    const [page, setPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [user, setUser] = useState(null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setUser(null);
        setPage('home');
    };

    // Renderiza a página atual com base no estado 'page'
    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'products':
                return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
            case 'productDetail':
                return <ProductDetailPage product={selectedProduct} setPage={setPage} />;
            case 'faq':
                return <FaqPage />;
            case 'login':
                return <LoginPage setPage={setPage} onLogin={handleLogin} />;
            case 'managerDashboard':
                 return user && user.role === 'manager' ? <ManagerDashboard user={user} /> : <LoginPage setPage={setPage} onLogin={handleLogin} />;
            case 'clientDashboard':
                 return user && user.role === 'client' ? <ClientDashboard user={user} setPage={setPage}/> : <LoginPage setPage={setPage} onLogin={handleLogin} />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
            <Header setPage={setPage} user={user} onLogout={handleLogout} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}
