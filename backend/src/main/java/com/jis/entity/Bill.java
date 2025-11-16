package com.jis.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String billID;

    private double amount;

    private Date generatedDate;

    @ManyToOne
    private Lawyer lawyer;

    private String status; // e.g. PENDING, PAID, CANCELLED

    public double calculateAmount() {
        return 100.0; // Per case view
    }

    public boolean processPayment() {
        // Implementation: Process payment
        return true;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBillID() { return billID; }
    public void setBillID(String billID) { this.billID = billID; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public Date getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(Date generatedDate) { this.generatedDate = generatedDate; }
    public Lawyer getLawyer() { return lawyer; }
    public void setLawyer(Lawyer lawyer) { this.lawyer = lawyer; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}