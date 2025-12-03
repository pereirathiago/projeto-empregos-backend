import { logService } from '@shared/services/LogService'
import { Request, Response, Router } from 'express'
import { Knex } from 'knex'
import { container } from 'tsyringe'

const healthRouter = Router()

healthRouter.get('/api/health/data', async (req: Request, res: Response) => {
  try {
    const db = container.resolve<Knex>('KnexConnection')

    const activeSessions = await db('user_sessions')
      .join('users', 'user_sessions.user_id', '=', 'users.id')
      .where('user_sessions.expires_at', '>', new Date())
      .select(
        'user_sessions.id as session_id',
        'user_sessions.created_at as session_created_at',
        'user_sessions.expires_at',
        'users.id as user_id',
        'users.name',
        'users.username',
        'users.email',
        'users.role',
      )

    const logs = logService.getLogs(200)

    res.json({
      success: true,
      data: {
        activeSessions,
        logs,
        serverTime: new Date().toISOString(),
        totalActiveSessions: activeSessions.length,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar dados de health',
    })
  }
})

healthRouter.get('/health', async (req: Request, res: Response) => {
  const html = getHealthPageHtml()

  res.setHeader('Content-Type', 'text/html')
  res.send(html)
})

function getHealthPageHtml(): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Health Dashboard - Projeto Empregos</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      color: #e0e0e0;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 30px;
    }

    header h1 {
      font-size: 2.5rem;
      color: #00d9ff;
      text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
      margin-bottom: 10px;
    }

    header p {
      color: #888;
      font-size: 1rem;
    }

    .stats-bar {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px 30px;
      flex: 1;
      min-width: 200px;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 217, 255, 0.2);
    }

    .stat-card h3 {
      font-size: 0.9rem;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .stat-card .value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #00d9ff;
    }

    .main-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    @media (max-width: 1024px) {
      .main-content {
        grid-template-columns: 1fr;
      }
    }

    .panel {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      overflow: hidden;
    }

    .panel-header {
      background: rgba(0, 217, 255, 0.1);
      padding: 15px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .panel-header h2 {
      font-size: 1.2rem;
      color: #00d9ff;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .panel-header h2::before {
      content: '';
      width: 10px;
      height: 10px;
      background: #00d9ff;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .panel-body {
      padding: 0;
      max-height: 500px;
      overflow-y: auto;
    }

    .panel-body::-webkit-scrollbar {
      width: 8px;
    }

    .panel-body::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
    }

    .panel-body::-webkit-scrollbar-thumb {
      background: rgba(0, 217, 255, 0.5);
      border-radius: 4px;
    }

    /* Users Table */
    .users-table {
      width: 100%;
      border-collapse: collapse;
    }

    .users-table th,
    .users-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .users-table th {
      background: rgba(0, 0, 0, 0.2);
      font-weight: 600;
      color: #00d9ff;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 1px;
    }

    .users-table tr:hover {
      background: rgba(0, 217, 255, 0.05);
    }

    .user-name {
      font-weight: 500;
      color: #fff;
    }

    .user-role {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-user {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }

    .role-company {
      background: rgba(255, 152, 0, 0.2);
      color: #ff9800;
    }

    .session-time {
      font-size: 0.85rem;
      color: #888;
    }

    /* Console Logs */
    .console {
      background: #0d1117;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .log-entry {
      padding: 8px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }

    .log-entry:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .log-timestamp {
      color: #6e7681;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    .log-level {
      font-weight: bold;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .log-level.info {
      background: rgba(0, 217, 255, 0.2);
      color: #00d9ff;
    }

    .log-level.warn {
      background: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }

    .log-level.error {
      background: rgba(244, 67, 54, 0.2);
      color: #f44336;
    }

    .log-level.debug {
      background: rgba(156, 39, 176, 0.2);
      color: #9c27b0;
    }

    .log-message {
      color: #c9d1d9;
      word-break: break-word;
      flex: 1;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-data svg {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
      opacity: 0.5;
    }

    .refresh-btn {
      background: rgba(0, 217, 255, 0.2);
      border: 1px solid rgba(0, 217, 255, 0.5);
      color: #00d9ff;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.3s;
    }

    .refresh-btn:hover {
      background: rgba(0, 217, 255, 0.3);
    }

    .refresh-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: #888;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4caf50;
      animation: statusPulse 2s infinite;
    }

    @keyframes statusPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(76, 175, 80, 0); }
    }

    .auto-refresh {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .auto-refresh label {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-size: 0.85rem;
      color: #888;
    }

    .auto-refresh input[type="checkbox"] {
      accent-color: #00d9ff;
    }

    footer {
      text-align: center;
      padding: 30px;
      color: #666;
      font-size: 0.85rem;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🖥️ Health Dashboard</h1>
      <p>Projeto Empregos - Monitor de Sistema</p>
    </header>

    <div class="stats-bar">
      <div class="stat-card">
        <h3>Usuários Online</h3>
        <div class="value" id="total-users">-</div>
      </div>
      <div class="stat-card">
        <h3>Total de Logs</h3>
        <div class="value" id="total-logs">-</div>
      </div>
      <div class="stat-card">
        <h3>Status do Servidor</h3>
        <div class="value" style="color: #4caf50; font-size: 1.5rem;">● ONLINE</div>
      </div>
      <div class="stat-card">
        <h3>Última Atualização</h3>
        <div class="value" id="last-update" style="font-size: 1rem;">-</div>
      </div>
    </div>

    <div class="main-content">
      <div class="panel">
        <div class="panel-header">
          <h2>Usuários Logados</h2>
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>Ao vivo</span>
          </div>
        </div>
        <div class="panel-body" id="users-panel">
          <div class="no-data">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <p>Carregando usuários...</p>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h2>Console de Logs</h2>
          <div class="auto-refresh">
            <label>
              <input type="checkbox" id="auto-refresh" checked>
              Auto-refresh
            </label>
            <button class="refresh-btn" onclick="fetchData()">↻ Atualizar</button>
          </div>
        </div>
        <div class="panel-body console" id="logs-panel">
          <div class="no-data">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
            <p>Carregando logs...</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>Projeto Empregos - UTFPR | Health Dashboard v1.0</p>
    </footer>
  </div>

  <script>
    let autoRefreshInterval = null;
    const AUTO_REFRESH_DELAY = 5000; // 5 segundos

    async function fetchData() {
      try {
        const response = await fetch('/api/health/data');
        const result = await response.json();

        if (result.success) {
          renderUsers(result.data.activeSessions);
          renderLogs(result.data.logs);
          updateStats(result.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    function renderUsers(sessions) {
      const panel = document.getElementById('users-panel');
      
      if (!sessions || sessions.length === 0) {
        panel.innerHTML = \`
          <div class="no-data">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <p>Nenhum usuário logado no momento</p>
          </div>
        \`;
        return;
      }

      const tableHTML = \`
        <table class="users-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Sessão Criada</th>
              <th>Expira em</th>
            </tr>
          </thead>
          <tbody>
            \${sessions.map(session => \`
              <tr>
                <td>
                  <span class="user-name">\${escapeHtml(session.name)}</span>
                  <br>
                  <small style="color: #666;">@\${escapeHtml(session.username)}</small>
                </td>
                <td>\${session.email ? escapeHtml(session.email) : '-'}</td>
                <td>
                  <span class="user-role role-\${session.role}">\${session.role}</span>
                </td>
                <td class="session-time">\${formatDate(session.session_created_at)}</td>
                <td class="session-time">\${formatDate(session.expires_at)}</td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      \`;

      panel.innerHTML = tableHTML;
    }

    function renderLogs(logs) {
      const panel = document.getElementById('logs-panel');
      
      if (!logs || logs.length === 0) {
        panel.innerHTML = \`
          <div class="no-data">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
            <p>Nenhum log registrado ainda</p>
          </div>
        \`;
        return;
      }

      // Mostrar os logs mais recentes primeiro
      const reversedLogs = [...logs].reverse();
      
      const logsHTML = reversedLogs.map(log => \`
        <div class="log-entry">
          <span class="log-timestamp">\${formatTime(log.timestamp)}</span>
          <span class="log-level \${log.level}">\${log.level}</span>
          <span class="log-message">\${escapeHtml(log.message)}\${log.metadata ? ' ' + JSON.stringify(log.metadata) : ''}</span>
        </div>
      \`).join('');

      panel.innerHTML = logsHTML;
    }

    function updateStats(data) {
      document.getElementById('total-users').textContent = data.totalActiveSessions || 0;
      document.getElementById('total-logs').textContent = data.logs ? data.logs.length : 0;
      document.getElementById('last-update').textContent = formatTime(new Date());
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    function formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

    function escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function toggleAutoRefresh() {
      const checkbox = document.getElementById('auto-refresh');
      
      if (checkbox.checked) {
        autoRefreshInterval = setInterval(fetchData, AUTO_REFRESH_DELAY);
      } else {
        if (autoRefreshInterval) {
          clearInterval(autoRefreshInterval);
          autoRefreshInterval = null;
        }
      }
    }

    // Inicialização
    document.getElementById('auto-refresh').addEventListener('change', toggleAutoRefresh);
    
    // Carregar dados iniciais
    fetchData();
    
    // Iniciar auto-refresh
    toggleAutoRefresh();
  </script>
</body>
</html>`
}

export default healthRouter
