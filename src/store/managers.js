import { defineStore } from 'pinia';
import QRCode from 'qrcode';

export const useManagersStore = defineStore('managers', {
    state: () => ({
        managers: [],
        isLoadingManagers: false,
    }),
    actions: {
        async getManagers() {
            if (this.isLoadingManagers) {
                return;
            }

            this.isLoadingManagers = true;
            this.managers = [];

            // insert path
            const url = '/stubs/getManagers.php';

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                const managers = data.managers;

                this.managers = managers.map(manager => ({
                    id: manager.ID,
                    name: `${manager.LAST_NAME} ${manager.NAME} ${manager.SECOND_NAME}`,
                    position: manager.WORK_POSITION,
                    company: 'Компания',
                    phone: manager.PERSONAL_MOBILE || '',
                    email: manager.EMAIL || '',
                    photo: manager.PERSONAL_PHOTO || '',
                    department: manager.UF_DEPARTMENT?.[0] || '',
                }));
            } catch (error) {
                console.error('Failed to fetch managers:', error);
            } finally {
                this.isLoadingManagers = false;
            }
        },

        generateVCard(manager) {
            const { name, position, company, phone, email, department } = manager;

            let vCard = `BEGIN:VCARD
VERSION:3.0
N:${name.split(' ')[0]};${name.split(' ')[1]}
FN:${name}
ORG:${company}
TITLE:${position}
TEL:${phone}
EMAIL:${email}`;

            if (department) {
                vCard += `
NOTE:${company}, ${position}, Отдел: ${department}`;
            }

            vCard += `
END:VCARD`;

            console.log(vCard)

            return vCard;
        },

        async downloadSVG(manager) {
            const vCardContent = this.generateVCard(manager);
            const qrCodeDataURL = await QRCode.toDataURL(vCardContent, { type: 'image/png', margin: 1 });

            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <image href="${qrCodeDataURL}" width="200" height="200"/>
      </svg>`;

            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${manager.name}.svg`;
            link.click();
            URL.revokeObjectURL(link.href);
        },
    },
});