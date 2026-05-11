// Popup script pour l'extension AegisScan
document.addEventListener('DOMContentLoaded', async () => {
  const statusIcon = document.getElementById('statusIcon');
  const statusTitle = document.getElementById('statusTitle');
  const statusDescription = document.getElementById('statusDescription');
  const connectSection = document.getElementById('connectSection');
  const statsSection = document.getElementById('statsSection');
  const connectButton = document.getElementById('connectButton');
  const dashboardLink = document.getElementById('dashboardLink');
  
  // URLs de l'application AegisScan
  const AEGISSCAN_URL = 'http://localhost:1420'; // URL de dev
  const DASHBOARD_URL = `${AEGISSCAN_URL}/dashboard`;
  const LOGIN_URL = `${AEGISSCAN_URL}/login`;
  
  // Vérifier le statut de connexion
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_STATUS' });
    
    if (response.connected) {
      // Connecté
      statusIcon.className = 'status-icon connected';
      statusTitle.textContent = 'Protection active';
      statusDescription.textContent = 'AegisScan analyse automatiquement tous les liens sur lesquels vous cliquez.';
      
      // Afficher les statistiques (simulées pour l'instant)
      statsSection.style.display = 'grid';
      document.getElementById('linksAnalyzed').textContent = '0';
      document.getElementById('threatsBlocked').textContent = '0';
      
      // Lien vers le dashboard
      dashboardLink.href = DASHBOARD_URL;
      dashboardLink.textContent = 'Ouvrir le tableau de bord';
      
    } else {
      // Non connecté
      statusIcon.className = 'status-icon disconnected';
      statusTitle.textContent = 'Protection inactive';
      statusDescription.textContent = 'Vous devez vous connecter à AegisScan pour activer la protection automatique.';
      
      // Afficher la section de connexion
      connectSection.style.display = 'block';
      
      // Lien vers la page de connexion
      dashboardLink.href = LOGIN_URL;
      dashboardLink.textContent = 'Se connecter à AegisScan';
    }
    
  } catch (error) {
    // Erreur de communication
    statusIcon.className = 'status-icon disconnected';
    statusTitle.textContent = 'Erreur de connexion';
    statusDescription.textContent = 'Impossible de communiquer avec l\'extension. Rechargez la page.';
    console.error('Erreur popup:', error);
  }
  
  // Gestionnaire du bouton de connexion
  connectButton.addEventListener('click', () => {
    chrome.tabs.create({ url: LOGIN_URL });
    window.close();
  });
  
  // Gestionnaire du lien dashboard
  dashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: dashboardLink.href });
    window.close();
  });
});

// Écouter les messages de synchronisation de token
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOKEN_UPDATED') {
    // Recharger la popup pour refléter le nouveau statut
    location.reload();
  }
});