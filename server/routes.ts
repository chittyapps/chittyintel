import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  fetchTimelineFromDatabases, 
  fetchLoanDetailsFromDatabase, 
  fetchLitigationStatusFromDatabase, 
  fetchPOVAnalysisFromDatabase,
  checkDatabaseConnections 
} from "./database-connections";
import { setupProductionDatabases } from "./database-schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Legal Intelligence Data API - Now Connected to Production Databases
  app.get("/api/legal/timeline", async (req, res) => {
    try {
      const timelineEvents = await fetchTimelineFromDatabases();
      res.json({ events: timelineEvents });
    } catch (error) {
      console.error('Timeline API error:', error);
      res.status(500).json({ error: "Failed to fetch timeline data from databases" });
    }
  });

  app.get("/api/legal/loan-details", async (req, res) => {
    try {
      const loanRecord = await fetchLoanDetailsFromDatabase();
      if (loanRecord) {
        res.json({
          principal: loanRecord.principal_amount,
          interestRate: loanRecord.interest_rate,
          status: loanRecord.current_status,
          borrower: loanRecord.borrower_entity,
          lender: loanRecord.lender_name,
          originationDate: loanRecord.origination_date,
          outstandingBalance: loanRecord.outstanding_balance,
          source: 'ChittyFinance Production Database',
          lastUpdated: new Date().toISOString()
        });
      } else {
        res.status(404).json({ error: "Loan record not found in database" });
      }
    } catch (error) {
      console.error('Loan details API error:', error);
      res.status(500).json({ error: "Failed to fetch loan details from database" });
    }
  });

  app.get("/api/legal/pov-analysis/:perspective", async (req, res) => {
    try {
      const { perspective } = req.params;
      const analysisData = await fetchPOVAnalysisFromDatabase(perspective);
      res.json(analysisData);
    } catch (error) {
      console.error('POV analysis API error:', error);
      res.status(500).json({ error: "Failed to fetch POV analysis" });
    }
  });

  app.get("/api/legal/litigation-status", async (req, res) => {
    try {
      const litigationRecord = await fetchLitigationStatusFromDatabase();
      res.json(litigationRecord);
    } catch (error) {
      console.error('Litigation status API error:', error);
      res.status(500).json({ error: "Failed to fetch litigation status" });
    }
  });

  app.get("/api/legal/database-status", async (req, res) => {
    try {
      const connections = await checkDatabaseConnections();
      res.json({
        status: 'Database connections checked',
        connections,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Database status API error:', error);
      res.status(500).json({ error: "Failed to check database connections" });
    }
  });

  app.post("/api/legal/setup-databases", async (req, res) => {
    try {
      console.log('🚀 Setting up ChittyIntel production databases...');
      const setupSuccess = await setupProductionDatabases();
      
      if (setupSuccess) {
        res.json({
          status: 'success',
          message: 'Production databases initialized with legal intelligence data',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Database setup failed - check server logs'
        });
      }
    } catch (error) {
      console.error('Database setup API error:', error);
      res.status(500).json({ error: "Failed to setup databases" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
