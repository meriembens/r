$(document).ready(function () {
    let appointments = []; // Stocke les rendez-vous

    // Fonction pour afficher les rendez-vous dans le tableau
    function displayAppointments(filteredAppointments) {
        const tbody = $('#clients-tbody');
        tbody.empty(); // Vide le tableau avant d'ajouter les nouvelles données

        // Trier les rendez-vous par date et heure
        filteredAppointments.sort((a, b) => {
            // Comparer la date et l'heure
            const dateA = new Date(a.date + ' ' + a.heure);
            const dateB = new Date(b.date + ' ' + b.heure);
            return dateA - dateB;
        });

        filteredAppointments.forEach(appointment => {
            const row = `
                <tr>
                    <td class="info">${appointment.nom}</td>
                    <td class="info">${appointment.prenom}</td>
                    <td class="info">${appointment.phone}</td>
                    <td class="info">${appointment.date}</td>
                    <td class="info">${appointment.heure}</td>
                    <td class="info">${appointment.doctor}</td>
                    <td>
                        <button class="confirm-btn" data-id="${appointment.appointment_id}">Confirmer</button>
                        <button class="delete-btn" data-id="${appointment.appointment_id}">Supprimer</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // Récupérer les rendez-vous depuis le serveur
    $.ajax({
        url: 'fetchAppointments.php', 
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.error) {
                console.error(data.error);
                return;
            }
            appointments = data; // Stocke tous les rendez-vous
            displayAppointments(appointments); // Affiche tous les rendez-vous au départ
        }
    });

    // Filtrer les rendez-vous en fonction du médecin sélectionné
    $('#filters').on('change', function() {
        const selectedDoctor = $(this).val(); // Récupère le médecin sélectionné
        const filteredAppointments = filterAppointmentsByDoctor(selectedDoctor); // Filtre les rendez-vous
        displayAppointments(filteredAppointments); // Affiche les rendez-vous filtrés
    });

    // Fonction de filtrage
    function filterAppointmentsByDoctor(doctorName) {
        if (doctorName === "tous") {
            return appointments; // Affiche tous les rendez-vous si "Tous les Docteurs" est sélectionné
        } else {
            return appointments.filter(appointment => appointment.doctor === doctorName); // Filtre par médecin
        }
    }

    // Gestionnaires des boutons "Confirmer" et "Supprimer"
    $('#clients-tbody').on('click', '.delete-btn', function () {
        const appointmentId = $(this).data('id');
        console.log('Delete appointment ID:', appointmentId);
        // Supprimez le rendez-vous
    });

    $('#clients-tbody').on('click', '.confirm-btn', function () {
        const appointmentId = $(this).data('id');
        console.log('Confirm appointment ID:', appointmentId);
        // Confirmez le rendez-vous
    });
});

// Toggle du menu et de la navigation latérale
const menuBtn = document.getElementById('menu-btn');
const sideNav = document.querySelector('.side-nav');

menuBtn.addEventListener('click', () => {
    sideNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
});
