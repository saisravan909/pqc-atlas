package policy

import (
	"fmt"

	"github.com/saisravan909/pqc-atlas/pkg/scanner"
)

// ViolationPolicy defines the CI/CD compliance gate behaviour.
type ViolationPolicy struct {
	FailOnCritical bool
	FailOnHigh     bool
	MaxQES         float64
}

// DefaultPolicy is the recommended gate for federal compliance pipelines.
var DefaultPolicy = ViolationPolicy{
	FailOnCritical: true,
	FailOnHigh:     true,
	MaxQES:         0.5,
}

// StrictPolicy fails on any finding above MEDIUM severity.
var StrictPolicy = ViolationPolicy{
	FailOnCritical: true,
	FailOnHigh:     true,
	MaxQES:         0.3,
}

// PolicyResult holds the outcome of a policy evaluation.
type PolicyResult struct {
	Passed     bool
	Violations []scanner.Finding
	Message    string
}

// Evaluate applies a ViolationPolicy to a set of scanner findings.
// Returns a PolicyResult indicating pass/fail and the triggering violations.
func Evaluate(findings []scanner.Finding, policy ViolationPolicy) PolicyResult {
	var violations []scanner.Finding

	for _, f := range findings {
		switch {
		case policy.FailOnCritical && f.Risk == scanner.RiskCritical:
			violations = append(violations, f)
		case policy.FailOnHigh && f.Risk == scanner.RiskHigh:
			violations = append(violations, f)
		case policy.MaxQES > 0 && f.QES > policy.MaxQES:
			violations = append(violations, f)
		}
	}

	if len(violations) == 0 {
		return PolicyResult{
			Passed:  true,
			Message: "[GATE PASS] Codebase meets NIST PQC compliance requirements.",
		}
	}

	return PolicyResult{
		Passed:     false,
		Violations: violations,
		Message:    fmt.Sprintf("[GATE FAIL] %d policy violation(s) detected. Build blocked.", len(violations)),
	}
}
