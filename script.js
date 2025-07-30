/**
 * Malla Curricular Interactiva
 * Autor: Gemini (Google AI)
 * Descripción: Script para gestionar una malla curricular interactiva con sistema de
 * requisitos, persistencia de datos y diseño responsivo.
 */

// Espera a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINICIÓN DE DATOS DE LA CARRERA ---
    // Contiene todos los ramos con su nombre, semestre y requisitos.
    // NOTA: Los nombres en la lista de 'requisitos' deben coincidir EXACTAMENTE
    // con los nombres de los ramos definidos en la malla.

    /**
     * Función auxiliar para convertir un nombre de ramo en un ID único y limpio.
     * Ejemplo: 'Biología Básica' -> 'biologia-basica'
     * @param {string} nombre - El nombre completo del ramo.
     * @returns {string} Un ID normalizado para usar en HTML y JS.
     */
    const normalizarId = (nombre) => {
        if (typeof nombre !== 'string') return '';
        return nombre
            .toLowerCase()
            .normalize("NFD") // Separa tildes (ej. 'á' -> 'a' + '´')
            .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos (tildes)
            .replace(/\s+/g, '-') // Reemplaza espacios con guiones
            .replace(/[^a-z0-9-]/g, ''); // Elimina cualquier caracter no alfanumérico excepto guiones
    };

    const mallaData = [
        // Semestre 1
        { nombre: 'Biología básica', semestre: 1, requisitos: [] },
        { nombre: 'Laboratorio de biología básica', semestre: 1, requisitos: [] },
        { nombre: 'Orientación institucional', semestre: 1, requisitos: [] },
        { nombre: 'Introducción a la filosofía', semestre: 1, requisitos: [] },
        { nombre: 'Física básica', semestre: 1, requisitos: [] },
        { nombre: 'Laboratorio de física', semestre: 1, requisitos: [] },
        { nombre: 'Lengua Española Básica I', semestre: 1, requisitos: [] },
        { nombre: 'Matemática Básica', semestre: 1, requisitos: [] },
        { nombre: 'Química Básica', semestre: 1, requisitos: [] },
        { nombre: 'Introducción a las ciencias sociales', semestre: 1, requisitos: [] },

        // Semestre 2
        { nombre: 'Biofísica', semestre: 2, requisitos: ['Biología básica', 'Laboratorio de biología básica', 'Física básica', 'Laboratorio de física'] },
        { nombre: 'Laboratorio de biofísica', semestre: 2, requisitos: ['Biología básica', 'Laboratorio de biología básica', 'Física básica', 'Laboratorio de física'] },
        { nombre: 'Educación física', semestre: 2, requisitos: [] },
        { nombre: 'Fundamentos de Historia Social Dominicana', semestre: 2, requisitos: [] },
        { nombre: 'Lengua Española Básica II', semestre: 2, requisitos: ['Lengua Española Básica I'] },
        { nombre: 'Fundamentos de Desarrollo Cognitivo', semestre: 2, requisitos: [] },
        { nombre: 'Química Orgánica', semestre: 2, requisitos: ['Química Básica'] },
        { nombre: 'Vida en Comunidad', semestre: 2, requisitos: ['Introducción a las ciencias sociales'] },
        
        // Semestre 3
        { nombre: 'Estructura y sistemas anatómicos', semestre: 3, requisitos: ['Biología básica', 'Laboratorio de biología básica'] },
        { nombre: 'Laboratorio de estructura y sistemas anatómicos', semestre: 3, requisitos: ['Biología básica', 'Laboratorio de biología básica'] },
        { nombre: 'Fundamentos de ética general', semestre: 3, requisitos: ['Introducción a la filosofía'] },
        { nombre: 'Antropología aplicada en medicina', semestre: 3, requisitos: ['Introducción a las ciencias sociales'] },
        { nombre: 'Historia de la cultura universal', semestre: 3, requisitos: ['Fundamentos de Historia Social Dominicana'] },
        { nombre: 'Inglés técnico en salud I', semestre: 3, requisitos: ['Lengua Española Básica II'] },
        { nombre: 'Introducción a la informática', semestre: 3, requisitos: ['Matemática Básica'] },
        { nombre: 'Bases para el análisis biométrico', semestre: 3, requisitos: ['Matemática Básica'] },
        
        // Semestre 4
        { nombre: 'Fisiología celular', semestre: 4, requisitos: ['Química Orgánica', 'Biología básica', 'Laboratorio de biología básica', 'Biofísica', 'Laboratorio de biofísica'] },
        { nombre: 'Bases histológicas del organismo', semestre: 4, requisitos: ['Biología básica', 'Laboratorio de biología básica'] },
        { nombre: 'Laboratorio bases histológicas del organismo', semestre: 4, requisitos: ['Biología básica', 'Laboratorio de biología básica'] },
        { nombre: 'Inglés técnico en salud II', semestre: 4, requisitos: ['Inglés técnico en salud I'] },
        { nombre: 'Salud y conducta humana', semestre: 4, requisitos: ['Introducción a las ciencias sociales'] },
        { nombre: 'Laboratorio de salud y conducta humana', semestre: 4, requisitos: ['Introducción a las ciencias sociales'] },
        { nombre: 'Introducción a la metodología investigación en salud', semestre: 4, requisitos: [] },
        { nombre: 'Fundamentos de soporte vital básico', semestre: 4, requisitos: ['Estructura y sistemas anatómicos', 'Laboratorio de estructura y sistemas anatómicos'] },
        { nombre: 'Tecnología información e investigación en salud', semestre: 4, requisitos: ['Introducción a la informática'] },

        // Semestre 5
        { nombre: 'Genética médica', semestre: 5, requisitos: ['Biología básica', 'Laboratorio de biología básica', 'Química Orgánica', 'Fisiología celular'] },
        { nombre: 'Laboratorio genética médica', semestre: 5, requisitos: ['Biología básica', 'Laboratorio de biología básica', 'Química Orgánica', 'Fisiología celular'] },
        { nombre: 'Bioquímica I', semestre: 5, requisitos: ['Biología básica', 'Laboratorio de biología básica', 'Química Orgánica'] },
        { nombre: 'Laboratorio bioquímica I', semestre: 5, requisitos: ['Biología básica', 'Laboratorio de biología básica', 'Química Orgánica'] },
        { nombre: 'Embriología', semestre: 5, requisitos: [] },
        { nombre: 'Histología grl del org y sist human', semestre: 5, requisitos: [] },
        { nombre: 'Laboratorio de Histología grl del org y sist human', semestre: 5, requisitos: [] },
        { nombre: 'Anatomía humana I', semestre: 5, requisitos: [] },
        { nombre: 'Laboratorio de anatomía humana I', semestre: 5, requisitos: [] },
        { nombre: 'Introducción a la clínica', semestre: 5, requisitos: [] },
        { nombre: 'Microbiología', semestre: 5, requisitos: [] },
        { nombre: 'Laboratorio de microbiología', semestre: 5, requisitos: [] },
        { nombre: 'Promoción en salud', semestre: 5, requisitos: ['Introducción a la clínica'] },

        // Semestre 6
        { nombre: 'Bioquímica II', semestre: 6, requisitos: ['Bioquímica I', 'Laboratorio bioquímica I'] },
        { nombre: 'Laboratorio de bioquímica II', semestre: 6, requisitos: ['Bioquímica I', 'Laboratorio bioquímica I'] },
        { nombre: 'Fisiología humana I', semestre: 6, requisitos: ['Fisiología celular', 'Biofísica'] },
        { nombre: 'Laboratorio de fisiología humana I', semestre: 6, requisitos: ['Fisiología celular', 'Biofísica'] },
        { nombre: 'Anatomía humana II', semestre: 6, requisitos: ['Anatomía humana I', 'Laboratorio de anatomía humana I'] },
        { nombre: 'Laboratorio de anatomía humana II', semestre: 6, requisitos: ['Anatomía humana I', 'Laboratorio de anatomía humana I'] },
        { nombre: 'Psicología médica', semestre: 6, requisitos: ['Salud y conducta humana', 'Laboratorio de salud y conducta humana'] },
        { nombre: 'Semiología Médica', semestre: 6, requisitos: [] },
        { nombre: 'Laboratorio semiología médica', semestre: 6, requisitos: [] },
        { nombre: 'Parasitología', semestre: 6, requisitos: ['Microbiología', 'Anatomía humana I', 'Laboratorio de anatomía humana I'] },
        { nombre: 'Salud colectiva', semestre: 6, requisitos: ['Introducción a las ciencias sociales'] },
        { nombre: 'Laboratorio salud colectiva', semestre: 6, requisitos: ['Introducción a las ciencias sociales'] },
        
        // Semestre 7
        { nombre: 'Fisiopatología I', semestre: 7, requisitos: ['Fisiología humana I', 'Laboratorio de fisiología humana I', 'Bioquímica II', 'Laboratorio de bioquímica II'] },
        { nombre: 'Fisiología humana II', semestre: 7, requisitos: ['Fisiología humana I', 'Laboratorio de fisiología humana I'] },
        { nombre: 'Laboratorio fisiología humana II', semestre: 7, requisitos: ['Fisiología humana I', 'Laboratorio de fisiología humana I'] },
        { nombre: 'Anatomía patológica I', semestre: 7, requisitos: ['Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Laboratorio anatomía patológica I', semestre: 7, requisitos: ['Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Neuroanatomía', semestre: 7, requisitos: ['Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Laboratorio Neuroanatomía', semestre: 7, requisitos: ['Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Semiología quirúrgica', semestre: 7, requisitos: ['Semiología Médica', 'Laboratorio semiología médica'] },
        { nombre: 'Laboratorio semiología quirúrgica', semestre: 7, requisitos: ['Semiología Médica', 'Laboratorio semiología médica'] },
        { nombre: 'Epidemiología', semestre: 7, requisitos: ['Salud colectiva', 'Laboratorio salud colectiva'] },
        { nombre: 'Laboratorio epidemiología', semestre: 7, requisitos: ['Salud colectiva', 'Laboratorio salud colectiva'] },
        { nombre: 'Gerencia y políticas de salud', semestre: 7, requisitos: ['Salud colectiva', 'Laboratorio salud colectiva'] },

        // Semestre 8
        { nombre: 'Inmunología general', semestre: 8, requisitos: ['Bioquímica II', 'Laboratorio de bioquímica II', 'Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Fisiopatología II', semestre: 8, requisitos: ['Fisiopatología I'] },
        { nombre: 'Laboratorio fisiopatología II', semestre: 8, requisitos: ['Fisiopatología I'] },
        { nombre: 'Farmacología', semestre: 8, requisitos: ['Bioquímica II', 'Laboratorio de bioquímica II', 'Fisiología humana II', 'Laboratorio fisiología humana II'] },
        { nombre: 'Laboratorio farmacología', semestre: 8, requisitos: ['Bioquímica II', 'Laboratorio de bioquímica II', 'Fisiología humana II', 'Laboratorio fisiología humana II'] },
        { nombre: 'Anatomía patológica II', semestre: 8, requisitos: ['Anatomía patológica I', 'Laboratorio anatomía patológica I'] },
        { nombre: 'Laboratorio anatomía patológica II', semestre: 8, requisitos: ['Anatomía patológica I', 'Laboratorio anatomía patológica I'] },
        { nombre: 'Sexología médica', semestre: 8, requisitos: ['Psicología médica', 'Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Asignatura optativa', semestre: 8, requisitos: [] },
        { nombre: 'Evolución sociohistórica medica', semestre: 8, requisitos: ['Epidemiología', 'Laboratorio epidemiología'] },
        
        // Semestre 9
        { nombre: 'Imagenología', semestre: 9, requisitos: [] },
        { nombre: 'Hematología médica', semestre: 9, requisitos: [] },
        { nombre: 'Laboratorio hematología médica', semestre: 9, requisitos: [] },
        { nombre: 'Farmacoterapeutica', semestre: 9, requisitos: ['Farmacología', 'Laboratorio farmacología'] },
        { nombre: 'Laboratorio farmacoterapeutica', semestre: 9, requisitos: ['Farmacología', 'Laboratorio farmacología'] },
        { nombre: 'Cirugía general', semestre: 9, requisitos: [] },
        { nombre: 'Infectología', semestre: 9, requisitos: [] },
        { nombre: 'Asignatura optativa', semestre: 9, requisitos: [] },
        { nombre: 'Bioética y normativas en salud', semestre: 9, requisitos: [] },
        
        // Semestre 10
        { nombre: 'Endocrinología', semestre: 10, requisitos: ['Fisiopatología I', 'Fisiopatología II', 'Laboratorio fisiopatología II', 'Bioquímica II', 'Laboratorio de bioquímica II', 'Fisiología humana I', 'Laboratorio de fisiología humana I'] },
        { nombre: 'Laboratorio endocrinología', semestre: 10, requisitos: ['Fisiopatología I', 'Fisiopatología II', 'Laboratorio fisiopatología II', 'Bioquímica II', 'Laboratorio de bioquímica II', 'Fisiología humana I', 'Laboratorio de fisiología humana I'] },
        { nombre: 'Nefrología', semestre: 10, requisitos: ['Imagenología', 'Infectología'] },
        { nombre: 'Psiquiatría', semestre: 10, requisitos: [] },
        { nombre: 'Laboratorio psiquiatría', semestre: 10, requisitos: [] },
        { nombre: 'Dermatología', semestre: 10, requisitos: ['Infectología'] },
        { nombre: 'Oftalmología', semestre: 10, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Laboratorio oftalmología', semestre: 10, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Neurología', semestre: 10, requisitos: ['Imagenología'] },
        { nombre: 'Laboratorio neurología', semestre: 10, requisitos: ['Imagenología'] },
        { nombre: 'Cardiología', semestre: 10, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Laboratorio cardiología', semestre: 10, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Pneumopatología', semestre: 10, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Laboratorio pneumopatología', semestre: 10, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Gastroenterología', semestre: 10, requisitos: ['Imagenología'] },
        { nombre: 'Laboratorio gastroenterología', semestre: 10, requisitos: ['Imagenología'] },
        { nombre: 'Medicina forense', semestre: 10, requisitos: [] },
        { nombre: 'Laboratorio medicina forense', semestre: 10, requisitos: [] },
        
        // Semestre 11
        { nombre: 'Nutrición', semestre: 11, requisitos: ['Bioquímica II', 'Laboratorio de bioquímica II', 'Fisiología humana II', 'Laboratorio fisiología humana II'] },
        { nombre: 'Neurocirugía', semestre: 11, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Anestesiología', semestre: 11, requisitos: ['Pneumopatología', 'Laboratorio pneumopatología'] },
        { nombre: 'Otorrinolaringología', semestre: 11, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Laboratorio otorrinolaringología', semestre: 11, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Traumatología y ortopedia', semestre: 11, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Laboratorio traumatología y ortopedia', semestre: 11, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Urología', semestre: 11, requisitos: ['Nefrología', 'Imagenología', 'Cirugía general'] },
        { nombre: 'Laboratorio urología', semestre: 11, requisitos: ['Nefrología', 'Imagenología', 'Cirugía general'] },
        { nombre: 'Oncología', semestre: 11, requisitos: ['Imagenología', 'Cirugía general'] },
        { nombre: 'Asignatura optativa', semestre: 11, requisitos: [] },

        // Semestre 12 - Preinternado
        { nombre: 'Pediatría y neonatología', semestre: 12, requisitos: ['Nutrición'] },
        { nombre: 'Gineco-obstetricia', semestre: 12, requisitos: ['Anestesiología', 'Oncología'] },
        { nombre: 'Emergencias médicas', semestre: 12, requisitos: ['Anestesiología', 'Imagenología', 'Cirugía general'] },
        { nombre: 'Metodología de la investigación en salud', semestre: 12, requisitos: ['Medicina forense', 'Bioética y normativas en salud'] },
        
        // Optativas
        { nombre: 'Toxicología grl', semestre: 'Optativas', requisitos: ['Epidemiología', 'Laboratorio epidemiología'] },
        { nombre: 'Introducción terapia en pareja y familiar', semestre: 'Optativas', requisitos: ['Psiquiatría', 'Laboratorio psiquiatría'] },
        { nombre: 'Medicina de urgencias y desastres', semestre: 'Optativas', requisitos: ['Fisiología humana I', 'Salud colectiva', 'Anatomía humana II', 'Laboratorio de anatomía humana II'] },
        { nombre: 'Genética clínica', semestre: 'Optativas', requisitos: [] },
        { nombre: 'Sustancias psicoactivas y adic', semestre: 'Optativas', requisitos: ['Semiología Médica', 'Laboratorio semiología médica', 'Fisiología humana II', 'Laboratorio fisiología humana II'] },
        { nombre: 'Medicina del deporte', semestre: 'Optativas', requisitos: ['Imagenología', 'Traumatología y ortopedia', 'Laboratorio traumatología y ortopedia'] },
        { nombre: 'Medicina física y rehabilitación', semestre: 'Optativas', requisitos: ['Imagenología', 'Traumatología y ortopedia', 'Laboratorio traumatología y ortopedia'] },
        { nombre: 'Salud ocupacional y ambiental', semestre: 'Optativas', requisitos: ['Salud colectiva', 'Epidemiología', 'Laboratorio epidemiología'] },

        // Internado Rotatorio
        { nombre: 'Clínica médico psiquiátrica', semestre: 'Internado', requisitos: [] },
        { nombre: 'Clínica pediátrica', semestre: 'Internado', requisitos: [] },
        { nombre: 'Clínica gineco-obstétrica', semestre: 'Internado', requisitos: [] },
        { nombre: 'Salud pública', semestre: 'Internado', requisitos: [] },
        { nombre: 'Medicina quirúrgica y traumatología', semestre: 'Internado', requisitos: [] },
        { nombre: 'Medicina interna', semestre: 'Internado', requisitos: [] },
    ];
    
    // Procesa los datos para añadir IDs y convertir requisitos a IDs.
    const cursosConId = mallaData.map(curso => ({
        ...curso,
        id: normalizarId(curso.nombre),
        requisitos: curso.requisitos.map(reqNombre => normalizarId(reqNombre))
    }));
    
    // Crea un mapa de ID -> Nombre para mostrar mensajes de error amigables.
    const mapaIdANombre = cursosConId.reduce((acc, curso) => {
        acc[curso.id] = curso.nombre;
        return acc;
    }, {});


    // --- 2. ESTADO DE LA APLICACIÓN ---
    // Carga los ramos aprobados desde localStorage. Si no hay nada, empieza con un conjunto vacío.
    // Usar un Set es más eficiente para añadir, eliminar y comprobar existencia (add, delete, has).
    let ramosAprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobados')) || []);

    /**
     * Guarda el conjunto actual de ramos aprobados en localStorage.
     */
    const guardarEstado = () => {
        // localStorage solo guarda strings, así que convertimos el Set a un Array y luego a JSON.
        localStorage.setItem('ramosAprobados', JSON.stringify(Array.from(ramosAprobados)));
    };


    // --- 3. GENERACIÓN DINÁMICA DE LA MALLA ---
    const mallaContainer = document.getElementById('malla-curricular');
    const generarMallaHTML = () => {
        mallaContainer.innerHTML = ''; // Limpiar la vista por si se regenera
        const semestresUnicos = [...new Set(cursosConId.map(c => c.semestre))];

        semestresUnicos.forEach(numeroSemestre => {
            const columna = document.createElement('div');
            columna.className = 'semestre-columna';

            const titulo = document.createElement('h3');
            titulo.className = 'semestre-titulo';
            // Formatea el título para que diga "Semestre 1", "Optativas", etc.
            titulo.textContent = typeof numeroSemestre === 'number' ? `Semestre ${numeroSemestre}` : numeroSemestre;
            columna.appendChild(titulo);
            
            // Filtra los cursos que pertenecen a este semestre y crea su elemento HTML.
            cursosConId
                .filter(curso => curso.semestre === numeroSemestre)
                .forEach(curso => {
                    const ramoDiv = document.createElement('div');
                    ramoDiv.className = 'ramo';
                    ramoDiv.textContent = curso.nombre;
                    ramoDiv.dataset.id = curso.id; // Usamos data-attributes para guardar el ID.
                    columna.appendChild(ramoDiv);
                });
            
            mallaContainer.appendChild(columna);
        });
    };

    // --- 4. LÓGICA DE ACTUALIZACIÓN VISUAL Y EVENTOS ---
    const modal = document.getElementById('mensaje-requisitos');
    const closeModalBtn = document.querySelector('.close-btn');
    const listaRequisitosFaltantes = document.getElementById('lista-requisitos-faltantes');

    /**
     * Actualiza la apariencia de todos los ramos en la malla según su estado.
     * Se ejecuta al inicio y cada vez que se aprueba o desaprueba un ramo.
     */
    const actualizarVisualizacion = () => {
        let algunRamoSemestre10Aprobado = false;
        
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            const id = ramoDiv.dataset.id;
            const curso = cursosConId.find(c => c.id === id);

            ramoDiv.classList.remove('aprobado', 'bloqueado');

            // 1. Aplicar clase 'aprobado' si el ID está en nuestro conjunto.
            if (ramosAprobados.has(id)) {
                ramoDiv.classList.add('aprobado');
                if (curso && curso.semestre === 10) {
                    algunRamoSemestre10Aprobado = true;
                }
            } else {
                // 2. Si no está aprobado, verificar si está bloqueado.
                const faltantes = curso.requisitos.filter(reqId => !ramosAprobados.has(reqId));
                if (faltantes.length > 0) {
                    ramoDiv.classList.add('bloqueado');
                }
            }
        });
        
        // 3. Gestionar la visibilidad del mensaje motivacional.
        const mensajeMotivacional = document.getElementById('mensaje-motivacional');
        if (algunRamoSemestre10Aprobado) {
            mensajeMotivacional.classList.add('visible');
        } else {
            mensajeMotivacional.classList.remove('visible');
        }
    };
    
    /**
     * Maneja el evento de clic en cualquier ramo de la malla.
     * @param {Event} e - El objeto del evento de clic.
     */
    const manejarClickRamo = (e) => {
        // Solo reaccionar si se hizo clic en un elemento con la clase 'ramo'.
        if (!e.target.classList.contains('ramo')) return;

        const ramoDiv = e.target;
        const id = ramoDiv.dataset.id;
        const curso = cursosConId.find(c => c.id === id);

        if (ramosAprobados.has(id)) {
            // Si ya está aprobado, el clic sirve para des-aprobarlo.
            ramosAprobados.delete(id);
        } else {
            // Si no está aprobado, verificar requisitos.
            const requisitosFaltantesIds = curso.requisitos.filter(reqId => !ramosAprobados.has(reqId));
            
            if (requisitosFaltantesIds.length > 0) {
                // Si faltan requisitos, mostrar el modal de advertencia.
                listaRequisitosFaltantes.innerHTML = ''; // Limpiar lista anterior.
                requisitosFaltantesIds.forEach(reqId => {
                    const li = document.createElement('li');
                    li.textContent = mapaIdANombre[reqId] || reqId; // Muestra el nombre del ramo.
                    listaRequisitosFaltantes.appendChild(li);
                });
                modal.style.display = 'flex';
                return; // Detener para no marcar como aprobado.
            } else {
                // Si cumple con los requisitos, se aprueba.
                ramosAprobados.add(id);
            }
        }
        
        // Guardar el nuevo estado y actualizar la vista.
        guardarEstado();
        actualizarVisualizacion();
    };
    
    // --- 5. INICIALIZACIÓN ---
    // Asignar los manejadores de eventos.
    mallaContainer.addEventListener('click', manejarClickRamo);
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { // Cierra el modal si se hace clic fuera de él.
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Llamadas iniciales para construir y mostrar la malla al cargar la página.
    generarMallaHTML();
    actualizarVisualizacion();

});
